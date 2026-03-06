import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './utils/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'],
    credentials: true
}));
app.use(express.json());

// Load Routes
import appointmentsRouter from './routes/appointments.js';
import doctorsRouter from './routes/doctors.js';
import hospitalsRouter from './routes/hospitals.js';
import authRouter from './routes/auth.js';

app.use('/api/appointments', appointmentsRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/auth', authRouter);

// Base route
app.get('/api', (req, res) => {
    res.json({ message: 'VaidyaConnect APIs are running.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`- http://localhost:${PORT}/api/hospitals`);
    console.log(`- http://localhost:${PORT}/api/doctors`);
    console.log(`- http://localhost:${PORT}/api/appointments`);
});
