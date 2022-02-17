const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('authoriztion-token');
    if(!token) return res.status(401).json({error: 'Acess denied' });

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Acess denied' });
    }
}