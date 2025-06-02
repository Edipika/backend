const {
  User,
  Address,
  Cart,
  CartItem,
  Order,
  OrderItem,
} = require("../models");

const processCheckout = async (req, res) => {
  const {
    user_id,
    amount_from_frontend,
    first_name,
    last_name,
    address1,
    address2,
    city,
    state,
    pincode,
    card_number,
    expiration_date,
    cvv,
    transaction_status,
  } = req.body;

  //validation starts
  const requiredFields = {
    user_id,
    amount_from_frontend,
    first_name,
    last_name,
    address1,
    city,
    state,
    pincode,
    card_number,
    expiration_date,
    cvv,
    transaction_status,
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value || value.toString().trim() === "") {
      return res.status(400).json({ message: `${key} is required.` });
    }
  }
  const user = await User.findOne({ where: { id: user_id } });
  if (!user_id || !user) {
    return res.status(400).json({ message: "please Login.." });
  }

  if (isNaN(amount_from_frontend) || Number(amount_from_frontend) <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a valid number greater than 0." });
  }

  if (!/^\d{16}$/.test(card_number)) {
    return res.status(400).json({ message: "Card number must be 16 digits." });
  }

  if (!/^\d{3}$/.test(cvv)) {
    return res.status(400).json({ message: "CVV must be 3 digits." });
  }

  if (!/^\d{6}$/.test(pincode)) {
    return res.status(400).json({ message: "Pincode must be 6 digits." });
  }

  if (!/^\d{2}\/\d{2}$/.test(expiration_date)) {
    return res
      .status(400)
      .json({ message: "Expiration date must be in MM/YY format." });
  }
  //validation ends

  if (transaction_status != 1) {
    return res
      .status(500)
      .json({ message: "Your transaction failed. Please try again." });
  }
  try {
    const address = await Address.create({
      user_id: user_id,
      address: address1,
      city: city,
      state: state,
      country: "India",
      pincode: pincode,
    });

    const cart = await Cart.query().where("user_id", user_id).first();
    const cartItems = await CartItem.query().where("user_id", user_id);
    const total = cart?.total_price;

    if (total === amount_from_frontend) {
      const order = await Order.create({
        user_id: user_id,
        total_amount: total,
        status: "completed",
        address_id: address?.id,
        card_number: card_number,
        expiry_date: expiration_date,
        cvv: cvv,
        transaction_id: `#${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      });

      for (const item of cartItems) {
        await OrderItem.create({
          order_id: order?.id,
          product_id: item?.product_id,
          quantity: item?.quantity,
          price: item?.price_at_purchase,
          sub_total: item?.price_at_purchase * item?.quantity,
        });
      }

      await CartItem.query().where("cart_id", cart?.id).delete();
      await Cart.query().where("user_id", user_id).delete();

      return res.status(200).json({
        message: "Order Placed Successfully",
        orderId: order?.transaction_id,
      });
    } else {
      return res.status(400).json({ message: "Amount Mismatch" });
    }
  } catch (error) {
    console.error("Order placement failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  processCheckout,
};
