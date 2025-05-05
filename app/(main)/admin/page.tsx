import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../../lib/auth/auth";
import prisma from "../../lib/prisma";
import RoleSwitcher from "../../components/RoleSwitcher";
import SignOutButton from "@/app/components/SignOutButton";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getServerSession(options);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
    orderBy: { email: "asc" },
  });

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/articles"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm shadow"
          >
            View All Articles
          </Link>
          <Link
            href="/profile"
            className="bg-gray-100 hover:bg-gray-200 text-indigo-700 px-4 py-2 rounded-md text-sm shadow"
          >
            Profile
          </Link>
          <SignOutButton />
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-indigo-100 text-left">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{user.name || "—"}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">
                <RoleSwitcher userId={user.id} currentRole={user.role} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
