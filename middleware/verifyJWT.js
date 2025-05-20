const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'Dipika@1811';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); //"Unauthorized"
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        // process.env.ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //forbidden invalid token
            req.user = decoded.UserInfo.username;
            // req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT