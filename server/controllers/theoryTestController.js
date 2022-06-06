const ApiError = require("../error/ApiError");
const {TheoryTest} = require('../models/models.js')

class TheoryTestController{

    async create(req, res, next){
        try {
            const {title, link, description, responseLink} = req.body
            await TheoryTest.create({title, link, description, responseLink});
            res.json({
                "message": "Teorijas tests ir izveidots!"
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
                "message": "Izmaiņas ir saglabātas"
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
                "message": "Teorijas tests ir izdzēsts!"
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