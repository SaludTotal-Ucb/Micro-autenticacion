
const USERS_DB = [
  { id: '1', name: 'Admin Salud', email: 'admin@saludtotal.bo', role: 'admin' },
  { id: '2', name: 'Dr. House', email: 'doctor@saludtotal.bo', role: 'doctor' },
  { id: '3', name: 'Juan Paciente', email: 'paciente@saludtotal.bo', role: 'paciente' },
];

export const validateUserCredentials = async (email: string, pass: string) => {
  const user = USERS_DB.find(u => u.email === email);
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  if (pass !== '12345678') {
    throw new Error('INVALID_PASSWORD');
  }

  const token = `JWT_${user.role.toUpperCase()}_SESSION_2026`;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};