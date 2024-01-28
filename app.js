const expressErros = require('express-async-errors')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const db = require('./src/database/databaseConfig.js')
dotenv.config();
const errorHandlerMiddleware = require('./src/middleware/errorsHandler.js')
const mongoSanitize = require('express-mongo-sanitize')
const limiters = require('./src/middleware/limiterAPI.js')

const app = express();
app.use(cors())

//Database Area
db();


//Middleware Area
app.use(bodyParser.json({limit : '30mb' , extended : true}))
app.use(bodyParser.urlencoded({limit : '30mb' , extended : true}))


app.get("/" ,(req , res) => {
    res.json({
        message : 'anasayfa'
    })
})

//API Rate Limiter
app.use('/api' , limiters)

//SQL Injection
app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );

const router = require('./src/router')
app.use('/api' , router)

//Errors
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3001
app.listen(port , () => {
    console.log(`Server is runnig ${port}`)
})