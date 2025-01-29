const { User, RefreshTokens } = require('../models');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'Dipika@1811';
const bcrypt = require('bcrypt');
const REFRESH_TOKEN_SECRET = 'Dipika@8502';

const handleLogin = async (req, res) => {
    console.error('Executing login requet');
    const cookies = req.cookies;

    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({
        where: { email: user }
    });
    // console.log('userdeepika',foundUser);

    if (!foundUser) return res.sendStatus(401); //Unauthorized 

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": foundUser.id,
                    "name": foundUser.name,
                    "role": foundUser.role,
                }
            },
            // process.env.ACCESS_TOKEN_SECRET,
            ACCESS_TOKEN_SECRET,
            { expiresIn: '5s' }
        );
        const newRefreshToken = jwt.sign(
            {
                "UserInfo": {
                    "id": foundUser.id,
                    "name": foundUser.name,
                    "role": foundUser.role,
                }
            },
            // process.env.REFRESH_TOKEN_SECRET,
            REFRESH_TOKEN_SECRET,
            { expiresIn: '60s' }
        );


        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;

            // Check if the refresh token exists in the database
            const refreshTokenRow = await RefreshTokens.findOne({ where: { token: refreshToken } });

            if (!refreshTokenRow) {
                // Token reuse detected, clear all refresh tokens for this user
                await RefreshTokens.destroy({ where: { userId: foundUser.id } });
            } else {
                // Remove only the reused token
                await RefreshTokens.destroy({ where: { token: refreshToken } });
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }


        try {
            await RefreshTokens.create({
                "user_id": foundUser.id,
                "token": newRefreshToken
            });

        } catch (error) {
            console.error('Error saving refresh token:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.error('sending access Token ');
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        // res.json({ accessToken });  foundUser.name and foundUser.role
        res.json({
            accessToken,
            name: foundUser.name,
            role: foundUser.role
        });

    } else {
        res.sendStatus(401);
    }

}

module.exports = {
    handleLogin
};



