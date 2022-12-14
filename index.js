const express =require('express')

const app =express()

const dotenv =require('dotenv')

const routes=require('./routes/routes')

var cors = require('cors')

app.use(cors())

const DataBase=require('./dataBase/mongoDb')

dotenv.config()

DataBase()

app.use(express.json({limit:"5mb"}))

app.use('/',routes)

app.listen(process.env.PORT,()=>{
    console.log("port connected")
})