const ApiError = require("../error/ApiError");
const {TheoryTestResult, TheoryTest} = require('../models/models.js')

class TheoryResultController {

    async create(req, res, next) {
        try {
            const {theoryTestId, response_link} = req.body
            await TheoryTestResult.create({ theoryTestId ,response_link});
            res.json({
                "message": "Result created"
            });
        } catch {
            return next(ApiError.internal())
        }
    }


    async delete(req, res, next) {
        try {
            await TheoryTestResult.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Result deleted"
            });
        } catch {
            return next(ApiError.internal())
        }
    }

    async getByTestId(req, res, next) {

        try {
            let {theoryTestId} = req.query
            let result = await TheoryTestResult.findAll({
                where: {theoryTestId},
                include: [{model:TheoryTest, attributes: ['title']}]})
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }


}

module.exports = new TheoryResultController()