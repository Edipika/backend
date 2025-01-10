const { User } = require('../models');
const bcrypt = require('bcrypt');


const adminRegistration = async (req, res) => {
    try {

        const { email, password } = req.body;
        const login = await User.create({
            email: email,
            password: password,
            role: 2,
        });
        return res.status(201).json({
            success: true,
            message: ' added successfully!',
        });

    } catch (error) {
        console.error('Error Occured:', error);
        return res.status(500).json({
            error: 'An error occurred while Logging In',
        });
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
            role: 2,
        });
        res.status(201).json({ 'success': `${name} Account created!` });
    } catch (error) {
        console.error('Error Occured:', error);
        res.status(500).json({ 'message': err.message });
    }
};

// const handleNewUser = async (req, res) => {
//     console.log('New User');
//     const { user, pwd } = req.body;
//     if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

//     // check for duplicate usernames in the db
//     const duplicate = await User.findOne({
//         where: { email: user }
//     });
//     if (duplicate) return res.sendStatus(409); //Conflict 

//     try {
//         //encrypt the password
//         const hashedPwd = await bcrypt.hash(pwd, 10);

//         //create and store the new user
//         const result = await User.create({
//             "email": user,
//             "password": hashedPwd
//         });

//         console.log(result);

//         res.status(201).json({ 'success': `New user ${user} created!????` });

//     } catch (err) {
//         res.status(500).json({ 'message': err.message });
//     }
// }


module.exports = {
    // handleNewUser
    userRegistration
};

// Dipika123 usename
// Dipika_@12 password