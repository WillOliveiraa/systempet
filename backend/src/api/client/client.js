const restful = require('node-restful')
const mongoose = restful.mongoose

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: true },
    cpf: { type: String, required: true },
    cellphone: { type: String, required: true },
    sex: { type: String, required: false }
        // enum: ['masculino', 'feminino'] }
})

module.exports = restful.model('Client', clientSchema)