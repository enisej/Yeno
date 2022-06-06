const Router = require('express')
const router = new Router()
const VacanciesController = require('../controllers/vacanciesController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/create',checkRole('ADMIN'), VacanciesController.create)
router.patch('/update/:id',checkRole('ADMIN'), VacanciesController.update)
router.delete('/delete/:id',checkRole('ADMIN'), VacanciesController.delete)
router.get('/all' ,checkRole('ADMIN'), VacanciesController.getAll )
router.get('/' , VacanciesController.getAllActive )
router.get('/sort/name' , checkRole('USER'),VacanciesController.getSortedByName )
router.get('/sort/status' , checkRole('USER'), VacanciesController.getSortByStatus )
router.get('/sort/date' , checkRole('USER'),VacanciesController.getSortedByDate )

module.exports = router