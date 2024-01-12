const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'Authorization token missing', success: false });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Auth Failed', success: false });
            } else {
                req.body.userId = decoded.id;
                next();
            }
        });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', success: false });
    }
};

module.exports = authToken;
