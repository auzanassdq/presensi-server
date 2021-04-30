const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const errorHandler = require("./middlewares/errorHandler")
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'image')));

app.use("/img/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, `/image/${req.params.filename}`));
});

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(errorHandler)

module.exports = app;
