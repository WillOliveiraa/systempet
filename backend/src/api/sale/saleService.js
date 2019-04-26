const Sale = require('./sale')
const errorHandler = require('../common/errorHandler')

Sale.methods(['get', 'post', 'put', 'delete'])
Sale.updateOptions({ new: true, runValidators: true })
Sale.after('post', errorHandler).after('put', errorHandler)

Sale.route('count', (req, res, next) => {
    Sale.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Sale