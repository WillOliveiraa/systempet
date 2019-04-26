const Client = require('./client')
const errorHandler = require('../common/errorHandler')

Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({ new: true, runValidators: true })
Client.after('post', errorHandler).after('put', errorHandler)

Client.route('count', (req, res, next) => {
    Client.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Client