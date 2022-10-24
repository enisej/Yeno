const {tests} = require('../models/models.js')

class testsController {

    async getTests(req, res, next) {
        try {
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 5
            let offset = page * limit - limit
            const data = await tests.findAll({limit, offset,
            })
            return res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

}
module.exports = new testsController()