const restful = require('node-restful')
const mongoose = restful.mongoose

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

module.exports = restful.model('Product', productSchema)