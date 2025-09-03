import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";

import authRoutes from "./routes/authRoutes";
import routinesRoutes from "./routes/routinesRoutes";
import usersRoutes from "./routes/usersRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//* Middleware to parse JSON
app.use(express.json());

//* Allowed origins
const allowedOrigins: string[] = [
  "http://localhost:3000",
  "https://zack-tech.netlify.app",
];

//* Configuración de CORS con tipado explícito
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      // permite Postman o curl
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//! ----------------ROUTES----------------------------
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/routines", routinesRoutes);
//! ---------------------------------------------------

//* Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
