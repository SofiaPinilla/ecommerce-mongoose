const express = require('express')
const OrderController = require('../controllers/OrderController')
const { authentication, isAuthor } = require('../middlewares/authentication')
const router = express.Router()

router.post('/',authentication, OrderController.create)
router.put('/:_id',authentication,isAuthor, OrderController.update)

module.exports = router