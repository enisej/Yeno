const Router = require('express')
const router = new Router()
const PracticeResultController = require('../controllers/practiceResultController.js')

router.post('/create', PracticeResultController.create)
router.delete('/delete', PracticeResultController.delete)
router.get('/userid/' , PracticeResultController.getByUserId)
router.get('/testid/' , PracticeResultController.getByTestId)

module.exports = router