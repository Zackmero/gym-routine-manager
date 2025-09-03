import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//* Middleware para parsear JSON
app.use(express.json());

//* Configuración de CORS - MÁS PERMISIVA PARA DEBUGGING
app.use(cors({
  origin: '*', // ⚠️ TEMPORAL - solo para debugging
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

// ✅ RUTAS DE PRUEBA BÁSICAS (sin importar archivos externos)
app.get("/", (req, res) => {
  res.json({ 
    message: "🏋️‍♂️ Gym Routine Manager API", 
    status: "running",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running perfectly!",
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// ✅ Ruta de auth de prueba
app.post("/auth/login", (req, res) => {
  console.log("🔐 Login attempt received:", req.body);
  res.json({ 
    message: "Login endpoint working!",
    received: req.body,
    cors: "enabled"
  });
});

// ✅ Capturar todas las rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.originalUrl,
    available_routes: ["/", "/health", "/auth/login"]
  });
});

//* Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 DEBUG SERVER running on port ${PORT}`);
  console.log(`🌐 CORS: Permitido para todos los orígenes (TEMPORAL)`);
  console.log(`📍 Test URLs:`);
  console.log(`   - https://rutinas-gimnasio.onrender.com/`);
  console.log(`   - https://rutinas-gimnasio.onrender.com/health`);
  console.log(`   - https://rutinas-gimnasio.onrender.com/auth/login`);
});