const Router = require('express')
const router = new Router()
const VacanciesController = require('../controllers/vacanciesController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

// Maršrutētajs , pie router klases tiks norādīta metode ar kuru vajag veikt pieprasijumu dati bāze ,
// tas varētu būt post ( pievienot) , patch (rediģēt) , delete (dzēst) , get (saņemt),
//apaļas iekavas tiks norādīts maršruts URL pa kuru var izsaukt funkciju , servera starpnieks
// parbauda lietotaja lomu , lai ierobēžot lietotājus ar statusu USER
// maršrutētajs griežas pie klases VacanciesContorller un ņem konkretu funkciju no klases
router.post('/create',checkRole('ADMIN'), VacanciesController.create)
router.patch('/update/:id',checkRole('ADMIN'), VacanciesController.update)
router.delete('/delete/:id',checkRole('ADMIN'), VacanciesController.delete)
router.get('/all' ,checkRole('ADMIN'), VacanciesController.getAll )
router.get('/' , VacanciesController.getAllActive )
router.get('/sort/name' ,VacanciesController.getSortedByName )
router.get('/sort/status' , checkRole('ADMIN'), VacanciesController.getSortByStatus )
router.get('/sort/date' ,VacanciesController.getSortedByDate )


//eksportējam ruteri
module.exports = router