const productModel = require("../model/productModel")
const APIError = require("../utils/errors")
const ResponseError = require("../utils/responseErrors")

const createProduct = async(req , res) => {
   
        try {
            const product = await productModel.create(req.body)
            return new ResponseError(product , 'Ürün başarılı bir şekilde oluşturuldu').create(res)
        } catch (error) {
            if(!product){
                throw new APIError('ürün eklenirken bir hata oluştu' , 404)
            }
        } 
}

module.exports = {createProduct}