const Router = require('express')
const router = new Router()
const TheoryTestController = require('../controllers/theoryTestController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/create',checkRole('ADMIN'), TheoryTestController.create)
router.patch('/update',checkRole('ADMIN'), TheoryTestController.update)
router.delete('/delete',checkRole('ADMIN'), TheoryTestController.delete)
router.get('/:id' ,checkRole('USER'), TheoryTestController.getById)
router.get('/' ,checkRole('USER'), TheoryTestController.getAll)

module.exports = router