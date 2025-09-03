import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authRoutes from "./routes/authRoutes";
import routinesRoutes from "./routes/routinesRoutes";
import usersRoutes from "./routes/usersRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//* Middleware para parsear JSON
app.use(express.json());

//* Configuración de CORS - MEJORADA
const allowedOrigins = [
  "https://zack-tech.netlify.app",
  "http://localhost:3000",     // Para desarrollo local
  "http://localhost:5173",     // Si usas Vite
  "http://localhost:3001"      // Backup para desarrollo
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir peticiones sin origin (Postman, apps móviles, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log(`🚫 Origin bloqueado por CORS: ${origin}`);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // ✅ Agregué OPTIONS
    allowedHeaders: [
      "Origin",
      "X-Requested-With", 
      "Content-Type", 
      "Accept", 
      "Authorization",
      "Cache-Control"
    ],
    credentials: true,
    optionsSuccessStatus: 200  // ✅ Para navegadores legacy
  })
);

// ✅ Middleware adicional para debugging CORS
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path} - Origin: ${req.get('Origin') || 'No origin'}`);
  next();
});

//! ----------------- ROUTES -----------------

console.log("✅ Auth Routes:", authRoutes);
console.log("✅ Users Routes:", usersRoutes);
console.log("✅ Routines Routes:", routinesRoutes);

//* Autenticación
app.use("/auth", authRoutes);

//* Usuarios
app.use("/users", usersRoutes);

//* Rutinas
app.use("/routines", routinesRoutes);

// ✅ Ruta de health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString(),
    cors: "Configured for " + allowedOrigins.join(", ")
  });
});

//! -----------------------------------------

//* Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 Allowed origins:`, allowedOrigins);
});