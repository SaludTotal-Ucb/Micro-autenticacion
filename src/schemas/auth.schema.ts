import { z } from 'zod';

// ==========================================
// LOGIN
// ==========================================
export const LoginSchema = z.object({
  email: z.string().email('Formato de email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// ==========================================
// REGISTRO
// ==========================================
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string().email('Formato de email inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

// ==========================================
// RECUPERAR CONTRASEÑA
// ==========================================
export const RecoverPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export type RecoverPasswordInput = z.infer<typeof RecoverPasswordSchema>;
