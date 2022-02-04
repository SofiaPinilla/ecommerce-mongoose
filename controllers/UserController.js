const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

const UserController = {
  async register(req, res) {
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) return res.status(400).send("Este correo ya esta registrado");
      user = await User.create(req.body);
      res.status(201).send({ message: "Usuario registrado con exito", user });
    } catch (error) {
      console.error(error.name)
      if (error.name == "ValidationError") {
        let errName = await Object.keys(error.errors)[0]
        res.status(400).send(error.errors[errName].message);
      }
      res.status(500).send(error);
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Bienvenid@ " + user.name, token });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al logear al usuario" });
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar conectar al usuario",
      });
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .populate("orderIds")
        .populate({
          path: "orderIds",
          populate: {
            path: "productIds._id",
          },
        })
        .populate('wishList')
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
