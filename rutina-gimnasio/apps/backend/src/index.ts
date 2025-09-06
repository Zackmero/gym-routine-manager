import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// ✅ CORREGIDO: Agregada extensión .js para ES modules
import authRoutes from "./routes/authRoutes.js";
import routinesRoutes from "./routes/routinesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//* Middleware para parsear JSON
app.use(express.json());

//* Configuración de CORS
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (Postman, etc)
    if (!origin) return callback(null, true);
    
    // Permitir todos los orígenes temporalmente
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin", 
    "X-Requested-With", 
    "Content-Type", 
    "Accept", 
    "Authorization"
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));



// ✅ Ruta básica de inicio
app.get("/", (req, res) => {
  res.json({ 
    message: "Gym Routine Manager API", 
    status: "running",
    timestamp: new Date().toISOString()
  });
});

//! ROUTES - Solo usar las rutas importadas, NO duplicar
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/routines", routinesRoutes);

// ✅ Capturar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.originalUrl,
    available_routes: ["/", "/auth/login", "/auth/register", "/users/me", "/routines"]
  });
});

//* Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Available routes:`);
  console.log(`   - GET /`);
  console.log(`   - POST /auth/login`);
  console.log(`   - POST /auth/register`);
  console.log(`   - GET /users/me`);
  console.log(`   - GET /routines`);
});