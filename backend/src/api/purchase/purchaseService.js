const Purchase = require('./purchase')
const errorHandler = require('../common/errorHandler')

Purchase.methods(['get', 'post', 'put', 'delete'])
Purchase.updateOptions({ new: true, runValidators: true })
Purchase.after('post', errorHandler).after('put', errorHandler)

Purchase.route('count', (req, res, next) => {
    Purchase.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Purchase