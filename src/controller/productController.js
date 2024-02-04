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

const updateProduct = async(req,res) => {
    const {id} = req.params
    try {
        await productModel.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message : "Güncelleme başarılı"
        })
    } catch (error) {
        throw new APIError('ürün eklenirken bir hata oluştu' , 404)
    }
}


const deleteProduct = async(req , res ) => {
    const {id} = req.params
    try {
    await productModel.findByIdAndDelete(id)
    res.status(200).json({
        message : "Silme işlemi başarılı"
    })
    } catch (error) {
        throw new APIError('ürün silinirken bir hata oluştu' , 404)
    }
}

const getallProduct = async(req, res) => {
    try {
        const allproduct = await productModel.find()
        res.status(200).json(allproduct)
    } catch (error) {
        throw new APIError('hiç ürün yok' , 404)
    }
    

}

const detailProduct = async(req, res) => {
    const {id} = req.params
    try {
        const detail = await productModel.findById(id)
        res.status(200).json(detail)
    } catch (error) {
        throw new APIError('ürün bulunamadı' , 404)
    }
}

module.exports = {createProduct , updateProduct , deleteProduct , getallProduct , detailProduct}