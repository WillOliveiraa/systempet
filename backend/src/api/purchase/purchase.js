const restful = require('node-restful')

const mongoose = restful.mongoose

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: true },
    cnpj: { type: String, required: true },
    cellphone: { type: String, required: true },
    sex: { type: String, required: false }
})

const purchaseItem = new mongoose.Schema({
    product: [productSchema],
    quantity: { type: Number, required: true },
    discount: { type: Number, required: false },
    subTotal: { type: Number, required: true },
})

const purchaseSchema = new mongoose.Schema({
    date: { type: String, required: true },
    description: { type: String, required: false },
    installmentNum: { type: Number, required: false },
    paymentForm: { type: String, required: true },
    total: { type: Number, required: true },
    purchaseItens: [purchaseItem],
    provider: [providerSchema]
})

module.exports = restful.model('Purchase', purchaseSchema)