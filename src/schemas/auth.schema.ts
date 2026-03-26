import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});