const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    // console.log(token)

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log(verify)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Admin: Invalid Token');
    }
}