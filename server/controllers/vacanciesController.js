const {Vacancy} = require('../models/models.js')
const ApiError = require('../error/ApiError.js')


class VacancyController {
    async create(req, res, next) {
        try {
            const {title, description, theoryTestId, practiceExerciseId, status, qualifications, offer} = req.body
            await Vacancy.create({title, description, theoryTestId, practiceExerciseId, status, offer, qualifications})
            res.json({
                "message": "Vakance ir izveidota!"
            });
        } catch {
            return next(ApiError.internal())
        }
    }

    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            const vacancies = await Vacancy.findAndCountAll({limit, offset,
            })
            return res.json(vacancies)
        } catch {
            return next(ApiError.internal())
        }
    }

    async getSortedByName(req, res, next) {
        try {
            let {limit, page, sort} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            const vacancies = await Vacancy.findAndCountAll({limit, offset,
                distinct: true,
                order: [
                    ['title', sort]
                ],
            })
            return res.json(vacancies)
        } catch {
            return next(ApiError.internal())
        }
    }

    async getSortedByDate(req, res, next) {
        try {
            let {limit, page, sort} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            const vacancies = await Vacancy.findAndCountAll({limit, offset,
                distinct: true,
                order: [
                    ['createdAt', sort]
                ],
            })
            return res.json(vacancies)
        } catch {
            return next(ApiError.internal())
        }
    }

    async getSortByStatus(req, res, next) {
        try {
            let {limit, page, sort} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            const vacancies = await Vacancy.findAndCountAll({limit, offset,
                distinct: true,
                order: [
                    ['status', sort]
                ],
            })
            return res.json(vacancies)
        } catch {
            return next(ApiError.internal())
        }
    }




    async getAllActive(req, res, next) {
        try {
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            const vacancies = await Vacancy.findAndCountAll({limit, offset,
                where: {
                status: true
                }
            })
            return res.json(vacancies)
        } catch {
            return next(ApiError.internal())
        }
    }


    async delete(req, res, next){
        try {
            await Vacancy.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.json({
                "message": "Vakance ir izdzēsta!"
            });
        } catch {
            return next(ApiError.internal())
        }
    }

    async update(req, res, next){
        try {
            await Vacancy.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "Izmaiņas ir saglābātas!"
            });
        } catch{
            return next(ApiError.internal())
        }
    }

}

module.exports = new VacancyController()