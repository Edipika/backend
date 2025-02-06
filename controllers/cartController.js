const { Cart, CartItem, Product, User } = require('../models');

const addToCart = async (req, res) => {
    try {
        const { products } = req.body; 
        const user_id = 2;
        const user = await User.findOne({ where: { id: user_id } });
        // Validate request
        if (!user_id || !user) {
            return res.status(400).json({ message: 'please Login..' });
        }
        // !Array.isArray(products)
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Check if the product exists
        // const product = await Product.findByPk(product_id);
        // if (!product) {
        //     return res.status(404).json({ message: 'Product not found' });
        // }

        // Find or create a cart for the user
        let cart = await Cart.findOne({ where: { user_id, status: 'active' } });
        if (!cart) {
            cart = await Cart.create({ user_id, total_price: 0, status: 'active' });
        }

        for (const item of products) {
            const { productId, quantity } = item;

            // Check if the product exists
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found` });
            }

            // Check if the product is already in the cart
            let cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });
            if (cartItem) {
                // Update quantity
                cartItem.quantity = quantity;
                await cartItem.save();
            } else {
                // Add new item to cart
                await CartItem.create({
                    cart_id: cart.id,
                    product_id: productId,
                    quantity,
                    price_at_purchase: product.price,
                });
            }
        }

        // Update total price in the cart
        const cartItems = await CartItem.findAll({ where: { cart_id: cart.id } });
        const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price_at_purchase, 0);
        cart.total_price = totalPrice;
        await cart.save();

        return res.status(200).json({ message: 'Products added to cart successfully', cart, cartItems });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addToCart,
};