import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import { options } from "../../../lib/auth/auth";
import Link from "next/link";
import SignOutButton from "@/app/components/SignOutButton";

export default async function AdminArticlesPage() {
  const session = await getServerSession(options);
  if (!session || session.user.role !== "ADMIN") redirect("/unauthorized");

  const articles = await prisma.article.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">All Articles</h1>
        <div className="flex gap-4">
          <Link
            href="/admin"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow text-sm"
          >
            ⬅ Back to Dashboard
          </Link>
          <SignOutButton />
        </div>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-600 text-center">No articles available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-indigo-800">
                {article.title}
              </h2>
              <p className="text-gray-700 mt-2 line-clamp-4">{article.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                Posted by <span className="font-medium">{article.author.email}</span>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                {new Date(article.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
