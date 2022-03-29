const Router = require('express')
const router = new Router()
const PracticeResultController = require('../controllers/practiceResultController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/create' ,checkRole('USER'), PracticeResultController.create)
router.delete('/delete/:id',checkRole('ADMIN'), PracticeResultController.delete)
router.get('/userid/',checkRole('USER') , PracticeResultController.getByUserId)
router.get('/testid/',checkRole('ADMIN') , PracticeResultController.getByTestId)
router.patch('/feedback/:id', checkRole('ADMIN'),PracticeResultController.SendFeetback)

module.exports = router