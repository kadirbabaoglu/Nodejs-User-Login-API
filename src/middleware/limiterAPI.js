const limitir = require('express-rate-limit')

const allowedIPList = ["::1"]

const limiters = limitir.rateLimit({
    windowMs : 50000,
    max : (req , res) =>{
        if(req.url === '/login'){
            return 5
        } else if(req.url === '/register'){
            return 10
        }else return 100
    },
    message : {
        success : false,
        message : 'Bu ip adresinden çok fazla istek gelmektedir.'

    },
    skip : (req , res) => allowedIPList.includes(req.ip),
    standardHeaders : true,
    legacyHeaders : false
})

module.exports = limiters