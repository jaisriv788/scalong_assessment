import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../prisma";
import { NextAuthOptions, DefaultSession } from "next-auth";
import bcrypt from "bcrypt";
import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
    role: "USER" | "ADMIN";
  }

  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    email: string;
    role: "USER" | "ADMIN";
  }
}

type Credentials = {
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "e.g. example@provider.com",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "e.g. Abc@12345",
          required: true,
        },
        role: {
          label: "Role",
          type: "text",
          placeholder: "USER or ADMIN",
          required: true,
        },
      },

      async authorize(
        credentials: Record<"email" | "password" | "role", string> | undefined
      ): Promise<User | null> {
        if (!credentials) {
          throw new Error("CredentialsSignin");
        }

        const { email, password, role } = credentials;

        if (!email.trim() || !password.trim() || !role.trim()) {
          throw new Error("CredentialsSignin");
        }

        // Validate email and password length
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email) || password.length < 8) {
          throw new Error("Invalid Email or Password");
        }

        if (role !== "USER" && role !== "ADMIN") {
          throw new Error("Invalid Role");
        }

        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid Credentials");
          }

          if (user.role !== role) {
            throw new Error("Role mismatch");
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        try {
          const newUser = await prisma.user.create({
            data: {
              name: "", // Optionally take `name` from credentials
              email,
              password: hashedPassword,
              role,
            },
          });

          return {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
          };
        } catch (e) {
          console.error(e);
          throw new Error("Error creating user");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role as "USER" | "ADMIN";
      }
      return token;
    },
  },
} satisfies NextAuthOptions;
