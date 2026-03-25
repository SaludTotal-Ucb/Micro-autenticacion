import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(`Intento de login para: ${email}`);

  if (email === 'admin@saludtotal.bo' && password === '123456') {
    return res.status(200).json({
      message: 'Login exitoso',
      token: 'JWT_TOKEN_PROVISIONAL_STB_2026',
      user: {
        id: '1',
        name: 'Admin Salud Total',
        role: 'ADMIN'
      }
    });
  }

  return res.status(401).json({ message: 'Credenciales inválidas' });
};

export const register = async (req: Request, res: Response) => {
  res.status(201).json({ message: 'Usuario registrado (Pendiente DB)' });
};