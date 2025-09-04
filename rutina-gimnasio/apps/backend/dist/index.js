import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
}));
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
app.post("/auth/login", (req, res) => {
    console.log("🔐 Login attempt received:", req.body);
    res.json({
        message: "Login endpoint working!",
        received: req.body,
        cors: "enabled"
    });
});
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        method: req.method,
        path: req.originalUrl,
        available_routes: ["/", "/health", "/auth/login"]
    });
});
app.listen(PORT, () => {
    console.log(`🚀 DEBUG SERVER running on port ${PORT}`);
    console.log(`🌐 CORS: Permitido para todos los orígenes (TEMPORAL)`);
    console.log(`📍 Test URLs:`);
    console.log(`   - http://localhost:${PORT}/`);
    console.log(`   - http://localhost:${PORT}/health`);
    console.log(`   - http://localhost:${PORT}/auth/login`);
});
