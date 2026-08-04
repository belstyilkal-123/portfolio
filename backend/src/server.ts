import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import messageRoutes from './routes/messageRoutes';
import adminRoutes from './routes/adminRoutes';
import githubRoutes from './routes/githubRoutes';
import settingRoutes from './routes/settingRoutes';
import { notFound, errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

// Verify required environment variables are set before startup
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Fatal Error: Environment variable ${key} is missing!`);
    process.exit(1);
  }
});

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/settings', settingRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// Register error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
