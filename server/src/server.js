import express from "express";
import dotenv from 'dotenv';

import connectDB from "./config/db.js";
import authRoutes from './routers/authRoutes.js'

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`🚀 Port running on ${PORT}`))