// var express = require('express');
import express from 'express';
// var router = express.Router();
// import router from 'express';
const router = express.Router();
// import Logger
import logger from '../lib/winston.js';

/* GET home page. */
// router.get('/', function(req, res, next) {
router.get('/', function(req, res) {
  res.render('index', { title: 'Proyecto Espectacular' });
});

// Rutas para pruebas de logs
router.get('/test-logs', (req, res) => {
  // Generar logs
  logger.error("Esto es una prueba del log tipo Error")
  logger.warn("Esto es una prueba del log tipo Warn")
  logger.info("Esto es una prueba del log tipo Info")
  logger.http("Esto es una prueba del log tipo HTTP")
  logger.debug("Esto es una prueba del log tipo Debug")

  // Estructurado respuesta (Solo un res.json, sin el res.send anterior)
  res.json({
    message: "Se crearon logs de prueba",
    archivos: [
      "logs/app-YYY-MM-DD.log",
      "logs/app-readble.log",
      "logs/error.log"
    ]
  });
});

// module.exports = router;
export default router;
