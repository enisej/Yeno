require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')
const errorHandler = require('./middleware/errorHandlingMiddleware.js')
const path = require('path')

const PORT = process.env.PORT

const app = express()
//izmanot ireobezotu piekluvi
app.use(cors())

// izmantot json formatu
app.use(express.json())

//izmantot mapi static un šeirot bildes
app.use(express.static(path.join(__dirname, 'static')))
//izmantot failu ielades biblioteku
app.use(fileUpload({}))

// izmantot definētus maršrutus no klasem.
app.use('/api', router)


// Middleware , starpnieks , lai apstradāt kludas.
app.use(errorHandler)

// startēt API
const start = async () => {
    try{
        //autorizacija datubāze
        await sequelize.authenticate()
        //sinhronizēšana ar datubāzi
        await sequelize.sync()
        //izmantot portu , kurs ir norādīts .env faila.
        //parādīt konsole , kā serveris stradā
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    } catch(e) {
        //izvadīt koncosle , ja ir kludas
        console.log(e)

    }

}
//izsaukt funkciju start, lai uzsakt API darbību
start()
