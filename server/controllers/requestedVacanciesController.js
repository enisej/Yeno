const ApiError = require("../error/ApiError");
const {RequestedVacancies, Vacancy} = require('../models/models.js')

class RequestedVacanciesController{

async create(req, res, next) {
    try {
        const {userId, vacancyId} = req.body
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
                include: [{model:Vacancy, attributes: ['title']}]})
            return res.json(result)

        } catch {

            return next(ApiError.internal())
        }

    }


}

module.exports = new RequestedVacanciesController()