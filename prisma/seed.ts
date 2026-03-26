import { PrismaClient, Role } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de datos...');

  // Hasher de contraseñas
  const hashedPassword = await bcryptjs.hash('12345678', 10);

  // ==========================================
  // CREAR USUARIOS DE PRUEBA
  // ==========================================

  // 1. ADMIN
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saludtotal.bo' },
    update: {},
    create: {
      email: 'admin@saludtotal.bo',
      password: hashedPassword,
      name: 'Admin Salud Total',
      role: Role.ADMIN,
    },
  });
  console.log('✅ Admin creado:', admin.email);

  // 2. USUARIO REGULAR
  const user = await prisma.user.upsert({
    where: { email: 'usuario@saludtotal.bo' },
    update: {},
    create: {
      email: 'usuario@saludtotal.bo',
      password: hashedPassword,
      name: 'Usuario Regular',
      role: Role.USER,
    },
  });
  console.log('✅ Usuario creado:', user.email);

  console.log('\n🎉 ¡Seed completado exitosamente!');
  console.log('\n📋 Usuarios de prueba:\n');
  console.log('Admin:');
  console.log('  Email: admin@saludtotal.bo');
  console.log('  Password: 12345678\n');
  console.log('Usuario:');
  console.log('  Email: usuario@saludtotal.bo');
  console.log('  Password: 12345678\n');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
