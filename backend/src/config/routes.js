const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    // Definir URL base para todas as rotas 
    // const router = express.Router()
    // server.use('/api', router)

    // // Rotas clients
    // const Client = require('../api/client/clientService')
    // Client.register(router, '/clients')

    // // Rotas Products
    // const Product = require('../api/product/productService')
    // Product.register(router, '/products')

    // // Rotas Animals
    // const Animal = require('../api/animal/animalService')
    // Animal.register(router, '/animals')

    // Novo padrão para Authorization

    /*
    * Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)
    
    // Rotas clients
    const Client = require('../api/client/clientService')
    Client.register(protectedApi, '/clients')

    // Rotas providers
    const Provider = require('../api/provider/providerService')
    Provider.register(protectedApi, '/providers')

    // Rotas Products
    const Product = require('../api/product/productService')
    Product.register(protectedApi, '/products')

    // Rotas Animals
    const Animal = require('../api/animal/animalService')
    Animal.register(protectedApi, '/animals')

    // Rotas Sale
    const Sale = require('../api/sale/saleService')
    Sale.register(protectedApi, '/sales')

    // Rotas Purchase
    const Purchase = require('../api/purchase/purchaseService')
    Purchase.register(protectedApi, '/purchases')

    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)
    
    const AuthService = require('../api/user/AuthService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}