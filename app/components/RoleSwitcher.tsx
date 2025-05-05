'use client';

import { useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  currentRole: "ADMIN" | "USER";
};

export default function RoleSwitcher({ userId, currentRole }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRoleChange = async () => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    await fetch("/api/admin/change-role", {
      method: "POST",
      body: JSON.stringify({ userId, newRole }),
      headers: { "Content-Type": "application/json" },
    });

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleRoleChange}
      disabled={isPending}
      className="px-4 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
    >
      Make {currentRole === "ADMIN" ? "USER" : "ADMIN"}
    </button>
  );
}
