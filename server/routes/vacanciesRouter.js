const Router = require('express')
const router = new Router()
const VacanciesController = require('../controllers/vacanciesController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/create',checkRole('ADMIN'), VacanciesController.create)
router.patch('/update/:id',checkRole('ADMIN'), VacanciesController.update)
router.delete('/delete/:id',checkRole('ADMIN'), VacanciesController.delete)
router.get('/all' ,checkRole('ADMIN'), VacanciesController.getAll )
router.get('/' , VacanciesController.getAllActive )

module.exports = router