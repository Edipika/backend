const { User, RefreshTokens } = require('../models');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'Dipika@1811';
const REFRESH_TOKEN_SECRET = 'Dipika@8502';

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    try {
        const foundToken = await RefreshTokens.findOne({ where: { token: refreshToken } });
        if (!foundToken) {
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
                if (!err) {
                    // If decoded successfully but token not found, delete all user's tokens
                    await RefreshTokens.destroy({ where: { userId: decoded.UserInfo.id } });
                }
            });
            return res.sendStatus(403); // Forbidden
        }

        // evaluate jwt 
        jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (!decoded?.UserInfo?.id) {
                    return res.status(403).json({ message: "Invalid token" });
                }
                const foundUser = await User.findOne({ where: { id: decoded.UserInfo.id } });
                if (err || foundUser.id !== decoded.UserInfo.id) {
                    return res.sendStatus(403); // Forbidden,Invalid or expired token  
                }
                // const foundUser = await User.findOne({ where: { id: decoded.id } });
                if (!foundUser) {
                    await RefreshTokens.destroy({ where: { token: refreshToken } }); // Clean up token if user not found
                    return res.sendStatus(403); // Forbidden
                }
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
                await foundToken.update({ token: newRefreshToken });

                // Creates Secure Cookie with refresh token
                res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

                res.json({ accessToken })
            }
        );
    } catch (error) {
        console.error('Error handling token refresh:', error);
        res.sendStatus(500);
    }


}

module.exports = { handleRefreshToken }