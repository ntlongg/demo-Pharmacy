const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    description : String,
    productImage : [],
    price : Number,
    sellingPrice : Number,
    status : String,
    classify: String,
    quantity : Number,
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel