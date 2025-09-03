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

//* Configuración de CORS
const allowedOrigins = [
  "https://zack-tech.netlify.app",
];

app.use(
  cors({
    origin: (origin: string | undefined, callback) => {
      // Permitir solicitudes sin origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPtIONS"],
    credentials: true,
  })
);

app.options("*", cors());

//! ----------------- RUTAS -----------------
//* Autenticación
app.use("/auth", authRoutes);

//* Usuarios
app.use("/users", usersRoutes);

//* Rutinas
app.use("/routines", routinesRoutes);

//! -----------------------------------------

//* Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
