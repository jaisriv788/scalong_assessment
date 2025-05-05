import { getServerSession } from "next-auth";
import { options } from "../lib/auth/auth";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const session = await getServerSession(options);

  if (!session?.user) {
    return redirect("/api/auth/signin");
  }

  if (session.user.role === "ADMIN") {
    return redirect("/admin");
  }

  if (session.user.role === "USER") {
    return redirect("/user");
  }

  return redirect("/");
}
