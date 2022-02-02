const User = require('../models/User');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js')

const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'No estas autorizado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }
}

const isAuthor = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params._id);
        if (order.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'Este pedido no es tuyo' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del pedido' })
    }
}

module.exports = { authentication, isAuthor }