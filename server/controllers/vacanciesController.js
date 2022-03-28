const {Vacancy, TheoryTest, PracticeExercise} = require('../models/models.js')
const ApiError = require('../error/ApiError.js')


class VacancyController {
    async create(req, res, next) {
        try {
            const {title, description, theoryTestId, practiceExerciseId, status} = req.body
            await Vacancy.create({title, description, theoryTestId, practiceExerciseId, status})
            res.json({
                "message": "Vacancy Created"
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
                include: [{model:PracticeExercise, attributes: ['title' , 'link']},
                          {model:TheoryTest, attributes: ['title' , 'link']
                    }],

            })
            return res.json(vacancies)
        } catch {
            return next(ApiError.internal())
        }
    }

    async getById(req, res, next){
        try {
            const vacancy = await Vacancy.findAll({
                where: {
                    id: req.params.id
                },
                include: [TheoryTest, PracticeExercise]
            });

            if (vacancy.length === 0)
            {
                return next(ApiError.badRequest())
            }else
            {
                res.json(vacancy[0]);
            }

        } catch {

            return ApiError.internal()
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
                "message": "Vacancy Deleted"
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
                "message": "Vacancy Updated"
            });
        } catch{
            return next(ApiError.internal())
        }
    }

}

module.exports = new VacancyController()