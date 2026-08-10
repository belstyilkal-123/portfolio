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
import blogRoutes from './routes/blogRoutes';
import skillRoutes from './routes/skillRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import resumeRoutes from './routes/resumeRoutes';
import mediaRoutes from './routes/mediaRoutes';
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

const allowedOrigins = [
  'http://localhost:5173',   // frontend dev
  'http://localhost:5174',   // frontend-admin dev
  /\.vercel\.app$/,          // any Vercel preview/production deployment
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      const allowed = allowedOrigins.some((o) =>
        typeof o === 'string' ? o === origin : o.test(origin)
      );
      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' not allowed`));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/media', mediaRoutes);

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
