const router = require('express').Router()

const users = require('./userRoute')

router.use(users)

module.exports = router