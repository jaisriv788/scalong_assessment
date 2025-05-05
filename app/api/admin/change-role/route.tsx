import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../../lib/auth/auth";
import prisma from "../../..//lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, newRole } = await req.json();

  if (!["USER", "ADMIN"].includes(newRole)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error updating role" }, { status: 500 });
  }
}
