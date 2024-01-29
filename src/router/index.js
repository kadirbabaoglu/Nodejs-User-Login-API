const router = require('express').Router()
const users = require('./userRoute')
const products = require("./productRoute")

router.use(users)
router.use(products)

module.exports = router