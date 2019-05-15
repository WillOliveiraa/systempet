const restful = require('node-restful')
const mongoose = restful.mongoose

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: true },
    cnpj: { type: String, required: true },
    cellphone: { type: String, required: true },
    sex: { type: String, required: false }
})

module.exports = restful.model('Provider', providerSchema)