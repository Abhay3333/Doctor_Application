const mongoose=require('mongoose')
require('dotenv').config()

const connectDB = process.env.MONGO_URL

mongoose.connect(connectDB)
        .then(()=>console.log('Mongo connected....'))
        .catch((err)=>console.log(err))