const { User } = require('../models');


const processCheckout = async (req, res) => {
    const { user_id, amount_from_frontend,
        first_name, last_name, address1, address2, city, state, pincode,
        card_number, expiration_date, cvv, transaction_status
    } = req.body;

    //validation starts
    const requiredFields = {
        user_id, amount_from_frontend,
        first_name, last_name, address1, city, state, pincode,
        card_number, expiration_date, cvv, transaction_status
    };

    for (const [key, value] of Object.entries(requiredFields)) {
        if (!value || value.toString().trim() === '') {
            return res.status(400).json({ message: `${key} is required.` });
        }
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user_id || !user) {
        return res.status(400).json({ message: 'please Login..' });
    }

    if (isNaN(amount_from_frontend) || Number(amount_from_frontend) <= 0) {
        return res.status(400).json({ message: 'Amount must be a valid number greater than 0.' });
    }

    if (!/^\d{16}$/.test(card_number)) {
        return res.status(400).json({ message: 'Card number must be 16 digits.' });
    }

    if (!/^\d{3}$/.test(cvv)) {
        return res.status(400).json({ message: 'CVV must be 3 digits.' });
    }

    if (!/^\d{6}$/.test(pincode)) {
        return res.status(400).json({ message: 'Pincode must be 6 digits.' });
    }

    if (!/^\d{2}\/\d{2}$/.test(expiration_date)) {
        return res.status(400).json({ message: 'Expiration date must be in MM/YY format.' });
    }
    //validation ends

    if (transaction_status == 2 || transaction_status == 3) {
        return res.status(502).json({ message: 'Error in processing your payment' });
    }

    if (transaction_status == 1) {
        

    }else{

    }

};

module.exports = {
    processCheckout
};


