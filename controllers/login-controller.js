const { User, RefreshTokens } = require('../models');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'Dipika@1811';
const bcrypt = require('bcrypt');
const REFRESH_TOKEN_SECRET = 'Dipika@8502';

const handleLogin = async (req, res) => {
    const cookies = req.cookies;

    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // const foundUser = await User.findOne({ username: user }).exec();
    const foundUser = await User.findOne({
        where: { email: user }
    });

    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // console.log("user details", foundUser);
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    // "roles": roles
                }
            },
            // process.env.ACCESS_TOKEN_SECRET,
            ACCESS_TOKEN_SECRET,
            { expiresIn: '5s' }
        );
        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            // process.env.REFRESH_TOKEN_SECRET,
            REFRESH_TOKEN_SECRET,
            { expiresIn: '10s' }
        );

        try {
            await RefreshTokens.create({
                "user_id": foundUser.id,
                "token": newRefreshToken
            });
             console.log("RefreshTokens", newRefreshToken);
  
        } catch (error) {
            console.error('Error saving refresh token:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }

}

module.exports = {
    handleLogin
};

// implement this later
// try {
//     // Fetch user details
//     const foundUser = await User.findOne({ where: { username: user } });

//     if (!foundUser) return res.sendStatus(401); // Unauthorized

//     // Verify password
//     const match = await bcrypt.compare(pwd, foundUser.password);
//     if (!match) return res.sendStatus(401); // Unauthorized

//     // Fetch refresh tokens
//     const storedRefreshTokens = await RefreshToken.findAll({
//         where: { userId: foundUser.id },
//         attributes: ['token'],
//     });

//     const tokenArray = storedRefreshTokens.map(rt => rt.token);
//     let newRefreshTokenArray = [];

//     if (cookies?.jwt) {
//         const refreshToken = cookies.jwt;

//         // Check for refresh token reuse
//         const foundToken = await RefreshToken.findOne({ where: { token: refreshToken } });

//         if (!foundToken) {
//             // Detected token reuse, clear all tokens
//             await RefreshToken.destroy({ where: { userId: foundUser.id } });
//         } else {
//             // Remove used refresh token
//             newRefreshTokenArray = tokenArray.filter(rt => rt !== refreshToken);
//         }

//         res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//     } else {
//         newRefreshTokenArray = tokenArray;
//     }

//     // Create new tokens
//     const roles = JSON.parse(foundUser.roles); // Assuming roles are stored as JSON in your User table
//     const accessToken = jwt.sign(
//         {
//             UserInfo: {
//                 username: foundUser.username,
//                 roles,
//             },
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '10s' }
//     );

//     const newRefreshToken = jwt.sign(
//         { username: foundUser.username },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: '15s' }
//     );

//     // Add new refresh token to the array
//     newRefreshTokenArray.push(newRefreshToken);

//     // Save new refresh token to the database
//     await RefreshToken.create({
//         userId: foundUser.id,
//         token: newRefreshToken,
//     });

//     // Set the refresh token cookie
//     res.cookie('jwt', newRefreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'None',
//         maxAge: 24 * 60 * 60 * 1000,
//     });

//     // Send the access token
//     res.json({ accessToken });
// } catch (err) {
//     console.error(err);
//     res.sendStatus(500); // Internal Server Error
// }

