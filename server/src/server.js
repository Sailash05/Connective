import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import passport from './config/passport.js';
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from './routers/authRoutes.js';
import userRoutes from './routers/userRoutes.js';
import postRouter from './routers/postRoutes.js';
import interactionRouter from './routers/interactionRoutes.js';

dotenv.config();
const app = express();

// app.use(cors({
//     origin: "http://192.168.1.7:5173", // allow your frontend
//     credentials: true,               // allow cookies if used
// }));

app.use(cors({ origin: '*', credentials: true }));  // For development only
app.use(express.json());
app.use(passport.initialize());

const PORT = process.env.PORT || 5000;
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRouter);
app.use('/api/interaction', interactionRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../client/dist"); // Vite build (or "../client/build" for CRA)

app.use(express.static(frontendPath));

// Catch-all: send index.html for unknown routes
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Port running on ${PORT}`))