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

app.use(cors({
  origin: ["http://localhost:3000", 
    "http://https://gym-routine-manager.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

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
