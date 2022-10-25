const {tests} = require('../models/models.js')

class testsController {

    async getTests(req, res) {
        try {
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 5

            let offset = page * limit - limit

            const data = await tests.findAll({limit, offset,
                where: {
                    status: false
                }
            })
            return res.json(data)
        } catch (e) {
            return console.log(e)
        }
    }

    async testStatusUpdate(req, res) {
        try {
            await tests.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Row status is updated"
            });
        } catch (e) {
            return console.log(e)
        }
    }

}
module.exports = new testsController()