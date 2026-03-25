import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Autenticación Salud Total' });
});

app.listen(PORT, () => {
  console.log(`Servidor vivo! en: http://localhost:${PORT}`);
});