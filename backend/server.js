const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const router = require('./routes');
const path = require('path');

const app = express();

app.use(cors({
    origin : process.env.FONTEND_URL,
    credentials : true
}))

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

const PORT = process.env.PORT || 8000;


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("connect to db")
        console.log("long dep trai")
		console.log(`Server is running on port ${PORT}`);
    })
})