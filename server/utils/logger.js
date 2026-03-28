const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Error Logs
    new winston.transports.File({ 
      filename: path.join(__dirname, "../logs/error.log"), 
      level: "error" 
    }),
    // Security Logs (Login, Refresh, Reuse)
    new winston.transports.File({ 
      filename: path.join(__dirname, "../logs/security.log"), 
      level: "warn" 
    }),
    // Combined Logs
    new winston.transports.File({ 
      filename: path.join(__dirname, "../logs/combined.log") 
    }),
  ],
});

// If not in production, log to console as well
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

// Define a simple custom transport to pipe Winston to Socket.io
logger.attachSocket = (emitter) => {
  logger.on('data', (log) => {
    // Stream ALL logs to combined (info level and above)
    emitter.emitNewLog(JSON.stringify(log));

    // Stream security-specific logs (warn logic used for security events)
    if (log.level === 'warn') {
       emitter.emitSecurityEvent(log);
    }
  });
};

module.exports = logger;
