const Product = require("../models/Product");

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send(product);
    } catch (error) {
      console.error(error);
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const products = await Product.find()
        .populate("reviews.userId")
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.send(products);
    } catch (error) {
      console.error(error);
    }
  },
  async getById(req, res) {
    try {
      const product = await Product.findById(req.params._id);
      res.send(product);
    } catch (error) {
      console.error(error);
    }
  },
  async getProductsByName(req, res) {
    try {
      const product = await Product.aggregate([
        {
          $match: {
            name: req.params.name,
          },
        },
      ]);
      res.send(product);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params._id);
      res.send({ product, message: "Producto eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "hubo un problema al intentar eliminar el producto" });
    }
  },
  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      res.send({ message: "Producto actualizado con éxito", product });
    } catch (error) {
      console.error(error);
    }
  },
  async insertComment(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params._id,
        { $push: { reviews: { ...req.body, userId: req.user._id } } },
        { new: true }
      );
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your review" });
    }
  },
};

module.exports = ProductController;
