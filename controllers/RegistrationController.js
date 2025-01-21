const { User } = require('../models');
const bcrypt = require('bcrypt');


const adminRegistration = async (req, res) => {
    console.log("request data of admin registration",req.body)
    try {
        const { name, email, pwd } = req.body;
        if (!email) return res.status(400).json({ 'message': 'Email is required' });
        if (!name || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
        const duplicate = await User.findOne({
            where: { email: email }
        });
        if (duplicate) return res.res.status(400).json({ 'message': 'Email is already Taken.' });
        const hashedPwd = await bcrypt.hash(pwd, 10);
        await User.create({
            name: name,
            email: email,
            password: hashedPwd,
            role: 2,
        });
        res.status(200).json({ 'message': `Account Registered successfully!` });
    } catch (error) {
        console.error('Error Occured:', error);
        res.status(500).json({ 'message': err.message });
    }
};

const userRegistration = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, pwd } = req.body;
        if (!email) return res.status(400).json({ 'message': 'Email is required' });
        if (!name || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
        const duplicate = await User.findOne({
            where: { email: email }
        });
        if (duplicate) return res.sendStatus(409);
        const hashedPwd = await bcrypt.hash(pwd, 10);
        await User.create({
            name: name,
            email: email,
            password: hashedPwd,
            role: 3,
        });
        res.status(200).json({ 'success': `Welcome ${name}!!` });
    } catch (error) {
        console.error('Error Occured:', error);
        res.status(500).json({ 'message': err.message });
    }
};


module.exports = {
    adminRegistration, userRegistration
};

// Dipika123 usename
// Dipika_@12 password