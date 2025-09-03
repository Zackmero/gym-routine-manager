"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const routinesRoutes_1 = __importDefault(require("./routes/routinesRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//* Middleware para parsear JSON
app.use(express_1.default.json());
//* Configuración de CORS
const allowedOrigins = [
    "https://zack-tech.netlify.app",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Permitir solicitudes sin origin (Postman, curl)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.options("*", (0, cors_1.default)());
//! ----------------- RUTAS -----------------
//* Autenticación
app.use("/auth", authRoutes_1.default);
//* Usuarios
app.use("/users", usersRoutes_1.default);
//* Rutinas
app.use("/routines", routinesRoutes_1.default);
//! -----------------------------------------
//* Inicio del servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
