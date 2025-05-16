"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import SignOutButton from "@/app/components/SignOutButton";

export default function UserPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="p-8">Loading...</p>;
  if (!session)
    return <p className="p-8">You must be signed in to view this page.</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-white flex flex-col items-center justify-start p-6">
      <nav className="w-full max-w-4xl bg-white shadow-md p-4 mb-8 flex justify-between items-center rounded-lg">
        <div className="flex gap-6">
          <Link
            href="/profile"
            className="text-indigo-600 hover:text-indigo-800 text-lg font-semibold"
          >
            Profile
          </Link>
          <Link
            href="/articles"
            className="text-indigo-600 hover:text-indigo-800 text-lg font-semibold"
          >
            Articles
          </Link>
        </div>
        <SignOutButton />
      </nav>

      <div className="w-full max-w-4xl bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Welcome, {session.user.name || "User"}
        </h1>

        <div className="space-y-4 text-gray-700">
          <div>
            <label className="font-medium">Email:</label>
            <p className="bg-gray-100 rounded p-2 mt-1">{session.user.email}</p>
          </div>

          <div>
            <label className="font-medium">Role:</label>
            <p className="bg-gray-100 rounded p-2 mt-1">{session.user.role}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
