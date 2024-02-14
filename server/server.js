const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('./Config/db.js');
const userRoute = require('./Routes/user.route.js')
dotenv.config();

const app = express();
const port = process.env.PORT || 3400;

app.use(express.json());
app.use(cors());
app.use('/api/user', userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}` );
    });