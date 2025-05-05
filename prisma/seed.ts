import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()

enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }
  
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  try {
    // Clean existing data
    console.log("Cleaning database...");
    await prisma.article.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("Seeding database...");

    // Create admin user
    const adminPassword = await hashPassword("admin123");
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: adminPassword,
        role: Role.ADMIN,
      },
    });
    console.log("Created admin user:", admin);

    // Create regular users
    const johnPassword = await hashPassword("password123");
    const john = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: johnPassword,
        role: Role.USER,
      },
    });
    console.log("Created user:", john);

    const janePassword = await hashPassword("password456");
    const jane = await prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        password: janePassword,
        role: Role.USER,
      },
    });
    console.log("Created user:", jane);

    // Create articles
    const adminArticles = await prisma.article.createMany({
      data: [
        {
          title: "Getting Started with Prisma",
          content:
            "Prisma is an ORM for TypeScript and Node.js that helps developers build faster and make fewer errors with a TypeScript ORM for PostgreSQL, MySQL, SQL Server, SQLite, MongoDB and CockroachDB.",
          authorId: admin.id,
        },
        {
          title: "Next.js Best Practices",
          content:
            "This article covers best practices when building applications with Next.js, including project structure, performance optimization, and deployment strategies.",
          authorId: admin.id,
        },
      ],
    });
    console.log("Created admin articles:", adminArticles);

    const johnArticles = await prisma.article.createMany({
      data: [
        {
          title: "Introduction to React Hooks",
          content:
            "React Hooks are a powerful feature that allows functional components to use state and other React features without writing a class.",
          authorId: john.id,
        },
        {
          title: "State Management in React",
          content:
            "This article compares different state management solutions for React applications, including Context API, Redux, and Zustand.",
          authorId: john.id,
        },
      ],
    });
    console.log("Created articles for John:", johnArticles);

    const janeArticles = await prisma.article.createMany({
      data: [
        {
          title: "Building a REST API with Node.js",
          content:
            "Learn how to build a RESTful API with Node.js, Express, and Prisma to handle CRUD operations.",
          authorId: jane.id,
        },
        {
          title: "Authentication with NextAuth.js",
          content:
            "This guide walks you through implementing authentication in your Next.js application using NextAuth.js.",
          authorId: jane.id,
        },
        {
          title: "CSS-in-JS Solutions Compared",
          content:
            "An overview of popular CSS-in-JS libraries like styled-components, Emotion, and Tailwind CSS.",
          authorId: jane.id,
        },
      ],
    });
    console.log("Created articles for Jane:", janeArticles);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
