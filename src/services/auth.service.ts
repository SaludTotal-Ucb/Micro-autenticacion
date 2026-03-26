import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const validateUserCredentials = async (
  email: string,
  password: string,
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('INVALID_PASSWORD');
  }
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

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone?: string,
) => {

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }
  const hashedPassword = await bcryptjs.hash(password, 10);

  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      phone: phone || null,
      role: 'PATIENT', 
    },
  });

  
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
      phone: user.phone,
      role: user.role,
    },
    token,
  };
};


export const logout = async () => {
  
  return { success: true };
};

export const recoverPassword = async (email: string) => {
  
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  return { email, success: true };
};

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
