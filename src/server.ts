import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for frontend
app.use(
  cors({
    origin: [
      'http://localhost',
      'http://127.0.0.1',
      'http://localhost:5174', // Vite dev server
      'http://localhost:5174', // Vite dev server (alternative port)
      'http://localhost:3000', // Alternative frontend port
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes); // Alias para compatibilidad con frontend que use /api/auth

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Autenticación Salud Total' });
});

app.listen(PORT, () => {
  console.log(`Servidor vivo! en: http://localhost:${PORT}`);
});
