import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const totalLockers = 100;

  // Crear lockers del 1 al 100 si no existen
  for (let i = 1; i <= totalLockers; i++) {
    await prisma.lockers.upsert({
      where: { id_locker: i },
      update: {},
      create: {
        id_locker: i,
        estado: 'disponible',
        id_afiliado: null,
      },
    });
  }

  console.log('Lockers iniciales creados');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
