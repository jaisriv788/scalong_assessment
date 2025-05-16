"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { updateUserName } from "../../lib/updateusername";
// import SignOutButton from "@/app/components/SignOutButton";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  if (status === "loading") return <p className="p-8">Loading...</p>;
  if (!session) return redirect("/unauthorized");

  const handleSubmit = async () => {
    setLoading(true);
    await updateUserName(session.user.id, name);
    setEditing(false);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-indigo-700 tracking-tight">
              Your Profile
            </h1>
          </div>
          <Link
            href="/user"
            className="text-sm text-indigo-600 hover:underline bg-indigo-100 hover:bg-indigo-200 px-3 py-3 rounded"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6 text-gray-700">
          <div>
            <label className="font-medium text-sm">Email:</label>
            <p className="bg-gray-100 rounded-lg p-4 mt-2 text-lg shadow-md">
              {session.user.email}
            </p>
          </div>

          <div>
            <label className="font-medium text-sm">Role:</label>
            <p className="bg-gray-100 rounded-lg p-4 mt-2 text-lg shadow-md">
              {session.user.role}
            </p>
          </div>

          <div>
            <label className="font-medium text-sm">Name:</label>
            <div className="mt-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editing}
                className={`w-full p-4 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  editing
                    ? "border-indigo-400 bg-white"
                    : "border-gray-300 bg-gray-100 cursor-not-allowed"
                } shadow-md`}
              />
              <div className="mt-4 flex gap-4 justify-start">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out"
                  >
                    Edit Name
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 ease-in-out"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setName(session.user.name || "");
                      }}
                      className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition duration-300 ease-in-out"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-500 mt-8">
        <p>Made with ❤️ by Your Team</p>
      </footer>
    </main>
  );
}
