const restful = require('node-restful')
const mongoose = restful.mongoose

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    breed: { type: String, required: true },
    birthDate: { type: String, required: true },
    situation: { type: String, required: false }
})

module.exports = restful.model('Animal', animalSchema)