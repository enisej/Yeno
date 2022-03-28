const Router = require('express')
const router = new Router()
const TheoryResultController = require('../controllers/theoryResultController.js')

router.post('/create', TheoryResultController.create)
router.delete('/delete',TheoryResultController.delete)
router.get('/userid' , TheoryResultController.getByUserId)
router.get('/testid' , TheoryResultController.getByTestId)

module.exports = router