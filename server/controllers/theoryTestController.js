const ApiError = require("../error/ApiError");
const {TheoryTest} = require('../models/models.js')

class TheoryTestController{

    async create(req, res, next){
        try {
            const {title, link, description, activeFrom, activeTo} = req.body
            await TheoryTest.create({title, link, description, activeFrom, activeTo});
            res.json({
                "message": "Test created"
            });
        } catch {
            return next(ApiError.internal())
        }
    }

    async update(req, res, next){
        try {
            await TheoryTest.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Test updated"
            });
        } catch{
            return next(ApiError.internal())
        }
    }

    async delete(req, res, next){
        try {
            await TheoryTest.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Test deleted"
            });
        } catch {
            return next(ApiError.internal())
        }
    }

    async getById(req, res, next){
        try {
            const test = await TheoryTest.findAll({
                where: {
                    id: req.params.id
                }
            });

            if (test.length === 0)
            {
                return next(ApiError.badRequest())
            }else
            {
                res.json(test[0]);
            }

        } catch {

            return ApiError.internal()
        }
    }

    async getAll(req, res, next){
        try {
            const tests = await TheoryTest.findAll()
            return res.json(tests)
        } catch {
            return next(ApiError.internal())
        }
    }

}

module.exports = new TheoryTestController()