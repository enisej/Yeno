const Router = require('express')
const router = new Router()
const TheoryResultController = require('../controllers/theoryResultController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/create',checkRole('USER'), TheoryResultController.create)
router.delete('/delete/:id',checkRole('ADMIN'),TheoryResultController.delete)
router.get('/userid' ,checkRole('USER'), TheoryResultController.getByUserId)
router.get('/testid' ,checkRole('ADMIN'), TheoryResultController.getByTestId)

module.exports = router