const Provider = require('./provider')
const errorHandler = require('../common/errorHandler')

Provider.methods(['get', 'post', 'put', 'delete'])
Provider.updateOptions({ new: true, runValidators: true })
Provider.after('post', errorHandler).after('put', errorHandler)

Provider.route('count', (req, res, next) => {
    Provider.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Provider