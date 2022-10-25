const Router = require('express')
const testsController = require('../controllers/testsController')
const router = new Router()

router.get('/tests',testsController.getTests);
router.patch('/tests/status/:id', testsController.testStatusUpdate);

module.exports = router