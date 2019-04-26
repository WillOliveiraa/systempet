const Animal = require('./animal')
const errorHandler = require('../common/errorHandler')

Animal.methods(['get', 'post', 'put', 'delete'])
Animal.updateOptions({ new: true, runValidators: true })
Animal.after('post', errorHandler).after('put', errorHandler)

Animal.route('count', (req, res, next) => {
    Animal.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Animal