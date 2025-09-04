import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import routinesRoutes from "./routes/routinesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
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
app.get("/", (req, res) => {
    res.json({
        message: "Gym Routine Manager API",
        status: "running",
        timestamp: new Date().toISOString()
    });
});
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/routines", routinesRoutes);
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        method: req.method,
        path: req.originalUrl,
        available_routes: ["/", "/auth/login", "/auth/register", "/users/me", "/routines"]
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Available routes:`);
    console.log(`   - GET /`);
    console.log(`   - POST /auth/login`);
    console.log(`   - POST /auth/register`);
    console.log(`   - GET /users/me`);
    console.log(`   - GET /routines`);
});
