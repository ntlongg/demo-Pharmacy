const express = require('express');
const cors = require('cors'); 
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(cors({
    origin : process.env.FONTEND_URL,
    credentials : true
}))
app.use(bodyParser.json());


const mailtrapClient = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ntlongg723@gmail.com',
		pass: 'ktze fcup sajw gpzs' 
	},
	secure: true
});

const sender = {
	email: "ntlongg723.com",
	name: "Thành Long"
};

module.exports = { mailtrapClient, sender }; 