const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const {MONGO_URL, PORT} = process.env;
const cookieParser = require('cookie-parser');
const authRoute = require('./Routes/AuthRoute');
const logger = require('morgan');

mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB is connected successfully'))
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server Listening at port ${PORT}`));
 

app.use(cors({
    origin: ['http://localhost:5173'], methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    })
);
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.json());

app.use('/', authRoute);