const express = require("express")
const router = express.Router()
const productController = require('../controllers/ProductController')
const { authMiddleware, authUserMiddleware } = require("../../middleware/authMiddleware")
const validateObjectId = require("../../middleware/validateObjectId")

router.post('/create', productController.createProduct)
router.put('/update/:id', validateObjectId, authMiddleware, productController.updateProduct)
router.get('/details/:id', validateObjectId, productController.getDetailProduct)
router.delete('/:id', validateObjectId, productController.deleteProduct)
router.get('/getAll', productController.getAllProduct)



module.exports = router
