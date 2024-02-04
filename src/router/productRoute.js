const router = require("express").Router()
const {createProduct ,updateProduct , deleteProduct , getallProduct , detailProduct} = require("../controller/productController")

router.post("/add-product" , createProduct)
router.get("/detail-product/:id" , detailProduct)
router.put("/update-product/:id" , updateProduct)
router.delete("/delete-product/:id" , deleteProduct)
router.get("/getall-product/" , getallProduct)

module.exports = router