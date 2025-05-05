'use client';

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm"
    >
      Sign Out
    </button>
  );
}
