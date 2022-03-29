const Router = require('express')
const router = new Router()
const VacanciesController = require('../controllers/vacanciesController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/create',checkRole('ADMIN'), VacanciesController.create)
router.patch('/:id',checkRole('ADMIN'), VacanciesController.update)
router.delete('/:id',checkRole('ADMIN'), VacanciesController.delete)
router.get('/:id' , VacanciesController.getById)
router.get('/' , VacanciesController.getAll )

module.exports = router