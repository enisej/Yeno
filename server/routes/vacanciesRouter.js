const Router = require('express')
const router = new Router()
const VacanciesController = require('../controllers/vacanciesController.js')

router.post('/create', VacanciesController.create)
router.patch('/:id', VacanciesController.update)
router.delete('/:id', VacanciesController.delete)
router.get('/:id' , VacanciesController.getById)
router.get('/' , VacanciesController.getAll )

module.exports = router