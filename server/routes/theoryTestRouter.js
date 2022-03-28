const Router = require('express')
const router = new Router()
const TheoryTestController = require('../controllers/theoryTestController.js')

router.post('/create', TheoryTestController.create)
router.patch('/update', TheoryTestController.update)
router.delete('/delete', TheoryTestController.delete)
router.get('/:id' , TheoryTestController.getById)
router.get('/' , TheoryTestController.getAll)

module.exports = router