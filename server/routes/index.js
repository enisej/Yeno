const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter.js')
const vacanciesRouter = require('./vacanciesRouter.js')
const theoryTestRouter = require('./theoryTestRouter.js')
const practiceRouter = require('./PracticeTestRouter.js')
const practiceResultRouter = require('./practiceResultRouter.js')
const requestedVacanciesRouter = require('./requestedVacanciesRouter.js')


router.use('/user', userRouter)
router.use('/vacancies', vacanciesRouter)
router.use('/test', theoryTestRouter)
router.use('/practice', practiceRouter )
router.use('/practice_results', practiceResultRouter)
router.use('/requested_vacancies', requestedVacanciesRouter)

module.exports = router