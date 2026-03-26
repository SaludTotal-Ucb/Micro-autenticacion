import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// ==========================================
// VALIDAR CREDENCIALES (Para Login)
// ==========================================
export const validateUserCredentials = async (
  email: string,
  password: string,
) => {
  // Buscar usuario por email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  // Comparar contraseña con hash
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('INVALID_PASSWORD');
  }

  // Generar JWT real
  const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

// ==========================================
// REGISTRAR NUEVO USUARIO
// ==========================================
export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  // Verificar si el email ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  // Hash de la contraseña
  const hashedPassword = await bcryptjs.hash(password, 10);

  // Crear usuario en la BD
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'PATIENT', // Por defecto, los nuevos usuarios son pacientes
    },
  });

  // Generar JWT
  const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

// ==========================================
// LOGOUT
// ==========================================
export const logout = async () => {
  // En una app real, aquí invalidarías el token en una tabla blacklist
  return { success: true };
};

// ==========================================
// RECUPERAR CONTRASEÑA
// ==========================================
export const recoverPassword = async (email: string) => {
  // Verificar que el usuario existe
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  // En una app real, aquí enviarías un email con link de reset
  // Por ahora, solo retornamos success
  return { email, success: true };
};

// ==========================================
// OBTENER PERFIL DEL USUARIO
// ==========================================
export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  return user;
};
