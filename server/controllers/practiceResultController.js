const ApiError = require("../error/ApiError");
const {PracticeResult, PracticeExercise} = require('../models/models.js')

class PracticeResultController{

    async create(req, res, next ){
        try {
            const {userId, theoryTestId} = req.body
            await PracticeResult.create({userId, theoryTestId});
            res.json({
                "message": "Result created"
            });
        } catch {
            return next(ApiError.internal())
        }
    }


    async delete(req, res, next){
        try {
            await PracticeResult.destroy({
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

    async getByUserId(req, res, next){

        try {
            let {userId} = req.query
            let result = await PracticeResult.findAll({
                where:{userId},
                include: [{model:PracticeExercise, attributes: ['title', 'link']}]
            })
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }

    async getByTestId(req, res, next){

        try {
            let {practiceExerciseId} = req.query
            let result = await PracticeResult.findAll({
                where:{practiceExerciseId},
                include: [{model:PracticeExercise, attributes: ['title', 'link']}]
            })
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }

}

module.exports = new PracticeResultController()