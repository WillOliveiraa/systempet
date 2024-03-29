const Product = require('./product')
const errorHandler = require('../common/errorHandler')

Product.methods(['get', 'post', 'put', 'delete'])
Product.updateOptions({ new: true, runValidators: true })
Product.after('post', errorHandler).after('put', errorHandler)

Product.route('count', (req, res, next) => {
    Product.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Product