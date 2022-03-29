const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware ,userController.check)

router.patch('/update',checkRole('USER'), userController.update)
router.delete('/delete',checkRole('USER'), userController.delete)
router.get('/', checkRole('ADMIN') ,userController.getAll)
router.get('/:id', checkRole('ADMIN') ,userController.getById)

module.exports = router