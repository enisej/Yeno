const ApiError = require("../error/ApiError");
const {PracticeExercise} = require('../models/models.js')

class PracticeTestController{

    async create(req, res, next){
        try {
            const {title, link, description, activeFrom, activeTo} = req.body
            await PracticeExercise.create({title, link, description, activeFrom, activeTo});
            res.json({
                "message": "Practice created"
            });
        } catch {
            return next(ApiError.internal())
        }
    }

    async update(req, res, next){
        try {
            await PracticeExercise.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Practice updated"
            });
        } catch{
            return next(ApiError.internal())
        }
    }

    async delete(req, res, next){
        try {
            await PracticeExercise.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Practice deleted"
            });
        } catch {
            return next(ApiError.internal())
        }
    }

    async getById(req, res, next){
        try {
            const practice = await PracticeExercise.findAll({
                where: {
                    id: req.params.id
                }
            });

            if (practice.length === 0)
            {
                return next(ApiError.badRequest())
            }else
            {
                res.json(practice[0]);
            }

        } catch {

            return ApiError.internal()
        }
    }

    async getAll(req, res, next){
        try {
            const practice = await PracticeExercise.findAll()
            return res.json(practice)
        } catch {
            return next(ApiError.internal())
        }
    }
}

module.exports = new PracticeTestController()