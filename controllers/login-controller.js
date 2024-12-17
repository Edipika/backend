const { User } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '54^%8687%';



const adminlogin = async (req, res) => {
    try {

        // console.log("inside admin login");
        const { email, password } = req.body;
        // Check if user with provided email exists
        const user = await User.findOne({ where: { email: email, } });
        // console.log(user);

        if (!user && user.role!=2) {
            return res.status(404).json({
                message: 'Invalid User',
            });
        }

        // Password verification (In a real app, you would hash passwords and compare here)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '60s' }
        );

        // Return token to client
        return res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            token,
        });


    } catch (error) {
        console.error('Error Occured:', error);
        return res.status(500).json({
            message: 'An error occurred while Logging In',
        });
    }
};


module.exports = {
     adminlogin
};


