require('dotenv').config()
const express = require('express')
const sequelize = require("./db.js");
const models = require('./models/models.js')
const cors = require('cors')
const router = require('./routes/index.js')

const path = require('path')
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT

const app = express()

//izmanot ireobezotu piekluvi
app.use(cors())

// izmantot json formatu
app.use(express.json())

app.use('/api', router)

// startēt API
const start = async () => {
    try{
            await sequelize.authenticate();

            await sequelize.sync();
            console.log('Connection has been established successfully.');
            app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))

            const puppeteerApp = require('./client/puppetier.js')
    } catch(e) {
        //izvadīt koncosle , ja ir kludas
        console.log(e)

    }

}
//izsaukt funkciju start, lai uzsakt API darbību
start()
