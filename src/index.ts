import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import express, { type Request, type Response, type NextFunction } from 'express';
import uploadRouter from './routes/upload.js';
import productRouter from './routes/products.js';

// 1. Catch uncaught synchronous exceptions across the application
process.on('uncaughtException', (error: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', error.name, error.message);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT;

// 2. Security & Parser Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://rebornclothing.vercel.app'
].filter(Boolean) as string[];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. API Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Server is running' });
});

app.use('/api', uploadRouter);
app.use('/api', productRouter);

// 4. Handle 404 Undefined Routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot find ${req.originalUrl} on this server`
  });
});

// 5. Real-Time Global Express Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('REAL-TIME ERROR LOG 💥:', {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 6. Database Connection & Server Startup
let server: ReturnType<typeof app.listen>;

const startServer = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is missing!');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connection established successfully.');

    server = app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

startServer();

// 7. Catch unhandled async promise rejections
process.on('unhandledRejection', (reason: unknown) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...', reason);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});