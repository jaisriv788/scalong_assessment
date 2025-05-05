import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { options } from "../../../lib/auth/auth";

export async function POST(req: Request) {
  const session = await getServerSession(options);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, authorId } = await req.json();

  if (!title || !content || !authorId)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const article = await prisma.article.create({
    data: { title, content, authorId },
  });

  return NextResponse.json(article, { status: 201 });
}
