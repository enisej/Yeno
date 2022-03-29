const Router = require('express')
const router = new Router()
const practiceTestController = require('../controllers/practiceController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/create' ,checkRole('ADMIN') , practiceTestController.create)
router.patch('/update',checkRole('ADMIN') , practiceTestController.update)
router.delete('/delete',checkRole('ADMIN') , practiceTestController.delete)
router.get('/:id' , practiceTestController.getById)
router.get('/' , practiceTestController.getAll)

module.exports = router