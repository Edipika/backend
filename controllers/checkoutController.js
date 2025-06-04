const {
  User,
  Address,
  Cart,
  CartItem,
  Order,
  OrderItem,
} = require("../models");
const { param } = require("../routes/categoryRoutes");

const processCheckout = async (req, res) => {
  console.log("Request Body:", req.body);
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
    name_on_card,
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
    name_on_card,
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
      first_name: first_name,
      last_name: last_name,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      country: "India",
      pincode: pincode,
    });

    const cart = await Cart.findOne({ where: { user_id: user_id } });
    const cartItems = await CartItem.findAll({ where: { cart_id: cart?.id } });
    const subtotal = cart?.total_price;

    const subtotalNum = Number(subtotal);
    const tax = subtotalNum * 0.18;
    const total = Number((subtotalNum + tax).toFixed(2));

    console.log(subtotal, total, amount_from_frontend);

    if (total === amount_from_frontend) {
      console.error(total, amount_from_frontend);
      const order = await Order.create({
        user_id: user_id,
        total_amount: total,
        status: "completed",
        address_id: address?.id,
        card_number: card_number,
        expiry_date: expiration_date,
        cvv: cvv,
        name_on_card: name_on_card,
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

      await CartItem.destroy({ where: { cart_id: cart?.id } });
      await Cart.destroy({ where: { user_id: user_id } });

      const orderItem = await OrderItem.findAll({ where: { order_id: order?.id } });
      // console.log(orderItem);

      return res.status(200).json({
        message: "Order Placed Successfully",
        order: order,

      });
    } else {
      return res.status(400).json({ message: "Amount Mismatch" });
    }
  } catch (error) {
    console.error("Order placement failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchOrderDetails = async (req, res) => {
  try {

    // const userId = param.user.id;
    const userId = req.query.userId;
    console.error(userId);
    // Fetch cart with cart items
    const order = await Order.findOne({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          as: 'order_items' // Make sure association alias matches your model
        },{
          model: Address,
          as: 'address'
        }
      ]
    });

    // Fetch shipping address
    // const address = await Address.findOne({
    //   where: { user_id: userId },
    //   order: [['created_at', 'DESC']] // Get latest address
    // });

    if (!order || !order.order_items.length) {
      return res.status(404).json({ message: "order is empty" });
    }

    // if (!address) {
    //   return res.status(404).json({ message: "Shipping address not found" });
    // }

    // Send order/order details along with address
    return res.status(200).json({
      order,
      address
    });

  } catch (error) {
    console.error("Order details failed to fetch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  processCheckout, fetchOrderDetails
};
