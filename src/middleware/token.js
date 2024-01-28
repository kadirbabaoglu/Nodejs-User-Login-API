const jwt  = require('jsonwebtoken');
const APIError = require('../utils/errors');
const userModel = require('../model/userModel');

const tokenCreate = async(userInfo , res) => {

    const payload = {
        userID : userInfo._id,
        name : userInfo.name
    }

    const userToken = jwt.sign(payload , process.env.SECRET_KEY , {
        algorithm : 'HS512',
        expiresIn : process.env.TOKEN_EXPIRE
    })

    return res.status(201).json({
        success : true,
        userToken : userToken,
        message : 'Token oluşturuldu'
    })
}


const tokenControll = async(req , res , next) => {
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")

    if(!headerToken)
        throw new APIError ("Oturum süresi dolmuş veya kullanıcı bilgileriniz değişmiş olabilir." , 401)

        const token = req.headers.authorization.split(" ")[1]
    
    await jwt.verify(token , process.env.SECRET_KEY , async(err , decoded)=> {
        if(err) throw new APIError("Geçersiz Token" , 401)

        const userInfo = await userModel.findById(decoded.userID).select("_id , name, lastname , email")
        
        if(!userInfo) throw new APIError("Geçersiz Token" , 401)

        req.userInfo = userInfo
        
    })
    next()
}


module.exports = {tokenCreate , tokenControll }