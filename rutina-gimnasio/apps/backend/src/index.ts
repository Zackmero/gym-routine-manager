import cors from "cors";
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

//* Configuration of CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://zack-tech.netlify.app",
  "https://gym-routine-manager.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir llamadas desde Postman o curl (sin origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

//* Manual manager OPTIONS to preflight
app.options("*", cors());

//! ----------------ROUTES----------------------------
//* Register Routes 
app.use("/auth", authRoutes);

//* Users Route
app.use("/users", usersRoutes);


//* Routines Routes
app.use("/routines", routinesRoutes);

//! ---------------------------------------------------

//* Start the server 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
