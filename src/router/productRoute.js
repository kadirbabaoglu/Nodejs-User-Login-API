const router = require("express").Router()
const {createProduct} = require("../controller/productController")



router.post("/add-product" , createProduct)


module.exports = router