//importamos biblioteca winston
import winston, { format } from 'winston';
import path from 'node:path';
import fs from 'node:fs';

//importamos biblioteca de transporte
import DailyRotateFile from 'winston-daily-rotate-file';

//Destructurando funciones format
const { combine, 
    timestamp,
    label, 
    printf, 
    colorize, 
    prettyPrint } = format;

//creamos directorio raiz
const __rootDir = path.resolve(process.cwd());

//creando ruta de logs
const logDir = path.join(__rootDir, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Definiendo esquema de colores 
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
};

//esquema de color a winston
winston.addColors(colors);

//creamos formatos de salida para los diferentes transportes
const myConsoleFormat = combine( 
    //AGREGANDO COLORES AL FORMATO
    colorize({ all: true }),
    // AGREGANDO UNA ETIQUETA A LOG 
    label({ label: '🎃'}),
    //AGREGANDO TIMESTAMP
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //AGREGANDO UN FORMATO PERSONALIZADO
    printf(info => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`)
);

const myFileFormat = combine(
    format.uncolorize(),
    timestamp(),
    format.json()
);

//creando transportes
// Creando el objeto de opciones para cada transporte
const options = {
  errorFile: {
    level: "error",
    filename: path.join(__rootDir, "logs", "error.log"), 
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat, 
  },
  readableFile: {
    filename: path.join(logDir, "app-readable.log"), 
    level: "info",
    format: combine(
      format.uncolorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      prettyPrint(),
    ),
    maxsize: 5242880,
    maxFiles: 5,
  },
  dailyRotateFile: {
    filename: path.join(logDir, "app-%DATE%.log"), 
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: myFileFormat,
  },
};

//instancia de logger 
const logger = winston.createLogger({
    transports: [
        new DailyRotateFile(options.dailyRotateFile), 
        new winston.transports.File(options.readableFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.console)
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(logDir, "rejections.log") 
        })
    ],
    exitOnError: false
});

export default logger;