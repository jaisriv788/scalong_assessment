# RBAC Assessment Project

This repository contains a Next.js application for the scaling assessment project.

## Setup Instructions

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/jaisriv788/scalong_assessment.git
cd scalong_assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="your_postgres_connection_string"
NEXTAUTH_SECRET="your_next_auth_secret"
```

- `DATABASE_URL`: Connection string for your PostgreSQL database
- `NEXTAUTH_SECRET`: Secret key for NextAuth authentication (can be any secure random string)

### 4. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Seed the Database

```bash
npm run db:seed
```

### 7. Start the Development Server

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Technologies Used

- Next.js
- Prisma ORM
- PostgreSQL
- NextAuth for authentication
