const ApiError = require("../error/ApiError");
const {RequestedVacancies, Vacancy} = require('../models/models.js')

class RequestedVacanciesController{

async create(req, res, next) {
    try {
        const {userId, vacancyId} = req.body

        const reqVacancy = await RequestedVacancies.findOne({where: {userId, vacancyId}})
        if (reqVacancy) {
            return res.json({
                "message": "vacancy has already been added"
            });
        }

        await RequestedVacancies.create({userId, vacancyId})

        res.json({
            "message": "Vacancy added"
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

    async delete(req, res, next){
        try {
            await RequestedVacancies.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.json({
                "message": "Vacancy deleted from profile"
            });
        } catch {
            return next(ApiError.internal())
        }
    }


}

module.exports = new RequestedVacanciesController()