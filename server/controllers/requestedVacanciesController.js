const ApiError = require("../error/ApiError");
const {RequestedVacancies, Vacancy} = require('../models/models.js')

class RequestedVacanciesController{

async create(req, res, next) {
    try {
        const {userId, vacancyId} = req.body

        const reqVacancy = await RequestedVacancies.findOne({where: {userId, vacancyId}})
        if (reqVacancy) {
            return res.json({
                "message": "Jūs jau pieteicaties šajai vakancei!"
            });
        }

        await RequestedVacancies.create({userId, vacancyId})

        res.json({
            "message": "Jūs pieteicaties vakancei!"
        });
    } catch {
        return next(ApiError.internal())
    }
}

    async getByUserId(req, res, next) {
        try {
            let {userId} = req.query
            let result = await RequestedVacancies.findAll({
                where: {userId},
                include: [{model:Vacancy, attributes: ['title', 'theoryTestId', 'practiceExerciseId']}]})
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }

    async getByUserIdAndTestId(req, res, next) {
        try {
            let {userId, practiceExerciseId} = req.query
            let result = await RequestedVacancies.findAll({
                where: {userId},
                include: [{model:Vacancy, attributes: ['title', 'theoryTestId', 'practiceExerciseId'] , where: {practiceExerciseId} }]})
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }


    async delete(req, res, next){
        try {
            await RequestedVacancies.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.json({
                "message": "Pieteikums vakancei ir izdzēst"
            });
        } catch {
            return next(ApiError.internal())
        }
    }


}

module.exports = new RequestedVacanciesController()