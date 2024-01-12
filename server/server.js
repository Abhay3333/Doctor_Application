const express = require('express')
require('dotenv').config()
const cors = require('cors')
require('./config/db')
const userRoute = require('./Routes/userRoute')
const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT


app.use('/api/users',userRoute)


app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})