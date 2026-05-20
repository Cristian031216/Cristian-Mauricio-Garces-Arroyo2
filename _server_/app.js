// var createError = require('http-errors');
import createError from 'http-errors';
// var express = require('express');
import express from 'express';
// var path = require('path');
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
// var logger = require('morgan');
import morgan from 'morgan';
//importando winston Logger
import logger from './lib/winston.js';

// importar el router del autor
// var indexRouter = require('./routes/index');
import indexRouter from './routes/index.js';
// var usersRouter = require('./routes/users');
import usersRouter from './routes/users.js';
// var authorRouter = require('./routes/author');
import authorRouter from './routes/author.js';

// Importando el configurador de handlebars
import { configureHandlebars } from "./lib/handlebars.js"

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//var app = express();
logger.info("Creando la instancia de expressjs")
var app = express();
logger.info("Inicia configuracion de express")
configureHandlebars(app);

// Redirigiendo el flujo de logs de morgan
//a winston
//morgan --->[logs]---> winston ---> transportes
app.use(morgan('dev', {
  stream: {
    write: (msg) => logger.http(msg.trim())
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//ARCHIVOS ESTATICOS backend
// Antes: app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'..', 'public')));

// estáticos de Vite
if (process.env.NODE_ENV === 'production') {
   app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
}

// rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // module.exports = app;
export default app;