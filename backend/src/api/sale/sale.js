const restful = require('node-restful')
// const Product = require('../product/product');

const mongoose = restful.mongoose
// const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: true },
    cpf: { type: String, required: true },
    cellphone: { type: String, required: true },
    sex: { type: String, required: false }
})

const saleItem = new mongoose.Schema({
    product: [productSchema],
    quantity: { type: Number, required: true },
    discount: { type: Number, required: false },
    subTotal: { type: Number, required: true },
})

const saleSchema = new mongoose.Schema({
    date: { type: String, required: true },
    description: { type: String, required: false },
    installmentNum: { type: Number, required: false },
    paymentForm: { type: String, required: true },
    total: { type: Number, required: true },
    saleItens: [saleItem],
    client: [clientSchema]
})

module.exports = restful.model('Sale', saleSchema)