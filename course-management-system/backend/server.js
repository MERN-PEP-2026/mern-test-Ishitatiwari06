import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://mern-test-ishitatiwari06-pxnd.vercel.app/',
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));