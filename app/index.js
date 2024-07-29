const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
const setRouter = require("./routes/Set");
const exerciseRouter = require("./routes/Exercise");
const userRouter = require("./routes/User");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/sets', setRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/users', userRouter);

module.exports = app;
