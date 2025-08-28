import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    //* Delate all data tables
    await prisma.routine.deleteMany();
    await prisma.user.deleteMany();


    //* Create User Demo 
    const passwordHash = await bcrypt.hash('12345678', 10);

    const user = await prisma.user.create({
        data: {
            name: 'User demo',
            email: 'demo@example.com',
            password: passwordHash,
        },
    });

    //* Create Routine Demo
    await prisma.routine.create({
        data: {
            title: 'Strength Routine',
            description: 'Strength training with free weights',
            level: 'INTERMEDIATE',
            userId: user.id,
        },
    });

    await prisma.routine.create({
        data: {
            title: 'Cardio Routine',
            description: 'High-intensity cardiovascular exercises',
            level: 'BEGINNER',
            userId: user.id,
        },
    });

    console.log('Seed complete!');
}

main()
    .then(() => prisma.$disconnect())
    .catch(e => {
        console.error(e);
        prisma.$disconnect;
        process.exit(1);
    });