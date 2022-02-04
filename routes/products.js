const express = require('express')
const ProductController = require('../controllers/ProductController')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()

router.post('/',authentication, ProductController.create)
router.get('/',ProductController.getAll)
router.get('/id/:_id',ProductController.getById)
router.get('/name/:name',ProductController.getProductsByName)
router.delete('/:_id',authentication,ProductController.delete)
router.put('/:_id',authentication,ProductController.update)
router.put('/review/:_id',authentication,ProductController.insertComment)
router.put('/like/:_id',authentication,ProductController.like)

module.exports = router