const { User, RefreshTokens } = require('../models');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'Dipika@1811';
const bcrypt = require('bcrypt');
const REFRESH_TOKEN_SECRET = 'Dipika@8502';

const handleLogin = async (req, res) => {
    console.error('Executing login request');
    const cookies = req.cookies;
    const { email, pwd } = req.body;

    // Check if email and password are provided
    if (!email || !pwd) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find the user with the provided email
    const foundUser = await User.findOne({
        where: { email: email }
    });
    console.log('userdeepika', foundUser);

    // If user is not found, send a 401 Unauthorized response
    if (!foundUser) {
        return res.status(401).json({ message: 'Incorrect username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(pwd, foundUser.password);
    console.log('match', match);

    // If password doesn't match, send a 401 Unauthorized response
    if (!match) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    // If credentials are correct, create access and refresh tokens
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": foundUser.id,
                "name": foundUser.name,
                "role": foundUser.role,
            }
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
    const newRefreshToken = jwt.sign(
        {
            "UserInfo": {
                "id": foundUser.id,
                "name": foundUser.name,
                "role": foundUser.role,
            }
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '23h' }
    );

    // Handle existing refresh token in cookies
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

    // Save new refresh token to the database
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

    // Create secure cookie with new refresh token
    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    // Send response with access token, user name, and role
    res.json({
        accessToken,
        name: foundUser.name,
        role: foundUser.role,
        email: foundUser.email,
        user_id: foundUser.id,
    });
};

module.exports = {
    handleLogin
};


