const { text } = require('body-parser')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    descripton : {
        type : String,
        require : true
    },
    img_url : {
        type : String,
        require : true
    },
    category : {
        type: String,
        require : true
    },
    author : {
        type : String,
        require : true
    },
    status : {
        type : Boolean,
        default : false,
    },
    commentStatus : {
        type : Boolean,
        default : false
    }
} , {timestamps : true})

module.exports = mongoose.model('Product' , productSchema)