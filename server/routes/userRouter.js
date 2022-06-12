const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware ,userController.check)

router.patch('/update/:id',checkRole('USER'), userController.update)
router.delete('/delete/:id',checkRole('USER'), userController.delete)
router.patch('/change/password/:id',checkRole('USER'), userController.updateUserPassword)
router.get('/', checkRole('ADMIN') ,userController.getAll)
router.get('/:id', checkRole('USER') ,userController.getById)
router.put('/image/change/:id', checkRole('USER'), userController.updateUserImage)



module.exports = router