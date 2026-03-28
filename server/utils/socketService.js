const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("./logger");

let io;

/**
 * Initialize Socket.io on the HTTP server
 */
const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
      credentials: true,
      methods: ["GET", "POST"]
    }
  });

  // --- Socket Middleware: JWT Handshake Auth ---
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(" ")[1];
      
      if (!token) return next(new Error("Authentication error: No token provided"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("role status");

      if (!user || user.status === "blocked") {
        return next(new Error("Access denied: Account suspended or not found"));
      }

      // Attach user info to socket
      socket.user = { id: user._id, role: user.role };
      next();

    } catch (err) {
       logger.error(`Socket Auth Failure: ${err.message}`);
       next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    logger.info(`New Client Connected: ${socket.id} (User: ${socket.user.id})`);

    // Only Admins can join the 'admin' room
    if (socket.user.role === "admin") {
      socket.join("admin");
      logger.info(`Admin ${socket.user.id} joined administrative stream.`);
    }

    socket.on("disconnect", () => {
      logger.info(`Client Disconnected: ${socket.id}`);
    });
  });

  return io;
};

/**
 * Global Emission Utility: Emit only to authorized admins
 */
const emitSecurityEvent = (eventData) => {
  if (io) {
    io.to("admin").emit("security_event", eventData);
  }
};

const emitNewLog = (logData) => {
  if (io) {
    io.to("admin").emit("new_log", logData);
  }
};

module.exports = { init, emitSecurityEvent, emitNewLog };
