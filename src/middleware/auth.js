const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('No token provided');

    try {
        const decoded = jwt.verify(token, config.get('vidly_jwtPrivateKey'))
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
}