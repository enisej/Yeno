const Router = require('express')
const router = new Router()
const practiceTestController = require('../controllers/practiceController.js')

router.post('/create', practiceTestController.create)
router.patch('/update', practiceTestController.update)
router.delete('/delete', practiceTestController.delete)
router.get('/:id' , practiceTestController.getById)
router.get('/' , practiceTestController.getAll)

module.exports = router