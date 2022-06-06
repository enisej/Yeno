const ApiError = require("../error/ApiError");
const {RequestedVacancies} = require("../models/models");
const {PracticeResult, PracticeExercise, User} = require('../models/models.js')

class PracticeResultController{

    async create(req, res, next ){
        try {

            const {userId, practiceExerciseId, responseLink, requestedVacancyId} = req.body
            const reqExercise = await PracticeResult.findOne({where: {userId, practiceExerciseId}})
            if (reqExercise) {
                return res.json({
                    "message": "Jūs jau iesniedzāt atbildi par šo testu!"
                });
            }
            await PracticeResult.create({userId, practiceExerciseId, responseLink, requestedVacancyId});
            res.json({
                "message": "Jūsu atbilde ir iesniegta!"
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
                "message": "Rezultāti ir izdzēsti!"
            });
        } catch {
            return next(ApiError.internal())
        }
    }

    async SendFeedback(req, res, next){
        try{
            const {RecievedPoints, Feedback, responseDescription} = req.body
            await PracticeResult.update({RecievedPoints, Feedback, responseDescription}, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Vērtējums ir iesniegts!"
            });

        }catch {
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
                include: [
                    {model:PracticeExercise, attributes: ['title', 'link']},
                    {model: User , attributes: ['name', 'surname', 'email']},
                    {model: RequestedVacancies , attributes: ['createdAt', 'vacancyId']}
                ]


            })
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }

    async getByTestIdTopAnswers(req, res, next){

        try {
            let {practiceExerciseId} = req.query
            let result = await PracticeResult.findAll({

                where:{practiceExerciseId, Feedback: true},
                distinct: true,
                // subQuery: flase
                order: [
                    ['RecievedPoints', 'DESC']
                ],
                include: [
                    {model:PracticeExercise, attributes: ['title', 'link']},
                    {model: User , attributes: ['name', 'surname', 'email']},
                    {model: RequestedVacancies , attributes: ['createdAt', 'vacancyId']}
                ],

            })
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }

    async getByFeedback(req, res, next){

        try {
            let {practiceExerciseId} = req.query
            let result = await PracticeResult.findAll({

                where:{practiceExerciseId, Feedback: false},
                distinct: true,
                order: [
                    ['Feedback', 'ASC']
                ],
                include: [
                    {model:PracticeExercise, attributes: ['title', 'link']},
                    {model: User , attributes: ['name', 'surname', 'email']},
                    {model: RequestedVacancies , attributes: ['createdAt', 'vacancyId']}
                ],

            })
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }



}

module.exports = new PracticeResultController()