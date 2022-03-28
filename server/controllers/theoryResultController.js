const ApiError = require("../error/ApiError");
const {TheoryTestResult, TheoryTest} = require('../models/models.js')

class TheoryResultController {

    async create(req, res, next) {
        try {
            const {userId, theoryTestId} = req.body
            await TheoryTestResult.create({userId, theoryTestId});
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

    async getByUserId(req, res, next) {

        try {

            let {userId} = req.query
            let result = await TheoryTestResult.findAll({
                where: {userId},
                include: [{model:TheoryTest, attributes: ['title', 'link']}]
            })
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }

    async getByTestId(req, res, next) {

        try {
            let {theoryTestId} = req.query
            let result = await TheoryTestResult.findAll({
                where: {theoryTestId},
                include: [{model:TheoryTest, attributes: ['title', 'link']}]})
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }


}

module.exports = new TheoryResultController()