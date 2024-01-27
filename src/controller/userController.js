const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const APIError = require('../utils/errors')
const ResponseError = require('../utils/responseErrors')
const {tokenCreate }= require('../middleware/token')

const login = async(req , res) => {
    const {email , password} = req.body

    const userInfo = await userModel.findOne({email})

    if(!userInfo){
        throw new APIError('Email veya şifre hatalıdır...!' , 401)
    }

    const comparePassword = await bcrypt.compare(password , userInfo.password)
       console.log(comparePassword)
    if(!comparePassword){
        throw new APIError('Email veya şifre hatalıdır...!' , 401)
    }

    tokenCreate(userInfo , res)
}

const register = async(req , res) => {
    const {email , password} = req.body

    const userCheck = await userModel.findOne({email : email})
    if(userCheck){
        throw new APIError('Bu mail adresi baska bir kullanıcı tarafından kullanılıyor.' , 401)
    }
    
    req.body.password = await bcrypt.hash(req.body.password , 10)

    try {
        const user = await userModel.create(req.body)
        return new ResponseError(user , 'Kullanıcı Başarılı bir şekilde kayıt edildi.').create(res)
        
    } catch (error) {
        throw new APIError('Kayıt işlemi başarısız', 400)
    }

}

const me = async(req , res) =>{
    return new ResponseError(req.userInfo).success(res)
}

module.exports = {
    login,
    register,
    me
}