const { User, RefreshTokens } = require('../models');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'Dipika@1811';
const REFRESH_TOKEN_SECRET = 'Dipika@8502';

const handleRefreshToken = async (req, res) => {
    console.log("request Data inside Hanle rEfresh Token ");
    console.log("request Data",req.cookies);
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    // const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    // if (!foundUser) {
    //     jwt.verify(
    //         refreshToken,
    //         process.env.REFRESH_TOKEN_SECRET,
    //         async (err, decoded) => {
    //             if (err) return res.sendStatus(403); //Forbidden
    //             // Delete refresh tokens of hacked user
    //             const hackedUser = await User.findOne({ username: decoded.username }).exec();
    //             hackedUser.refreshToken = [];
    //             const result = await hackedUser.save();
    //         }
    //     )
    //     return res.sendStatus(403); //Forbidden
    // }
    try {
        // const foundUser = await RefreshTokens.findOne({
        //     where: { token: refreshToken }
        // });
        // if (!foundUser) return res.sendStatus(403); // Forbidden
        // const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

        // Find the refresh token in the database
        const foundToken = await RefreshTokens.findOne({ where: { token: refreshToken } });
        if (!foundToken) return res.sendStatus(403); // Forbidden

        // Find the associated user
        const foundUser = await User.findByPk(foundToken.user_id);
        if (!foundUser) return res.sendStatus(403); // Forbidden

        // evaluate jwt 
        jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err || foundUser.username !== decoded.username) {
                    // expired refresh token
                    await foundToken.destroy(); // Remove the invalid token
                    return res.sendStatus(403); // Forbidden
                }

                // Refresh token was still valid
                // const roles = Object.values(foundUser.roles);
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
                    { expiresIn: '60s' }
                );


                // Saving refreshToken with current user
                await RefreshTokens.create({
                    user_id: foundUser.id,
                    token: newRefreshToken,
                });

                // Remove the old refresh token
                await foundToken.destroy();

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