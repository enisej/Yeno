const Router = require('express')
const router = new Router()
const RequestedVacanciesController = require('../controllers/requestedVacanciesController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/create', checkRole('USER'), RequestedVacanciesController.create)
router.get('/', checkRole('USER'), RequestedVacanciesController.getByUserId )
router.delete('/delete/:id', checkRole('USER'), RequestedVacanciesController.delete )
router.get('/req', checkRole('USER'), RequestedVacanciesController.getByUserIdAndTestId)

module.exports = router