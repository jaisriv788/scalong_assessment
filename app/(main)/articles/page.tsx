import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";
import { options } from "../../lib/auth/auth";
import CreateArticleForm from "../../components/CreateArticleForm";

export default async function UserArticlesPage() {
  const session = await getServerSession(options);
  if (!session) redirect("/api/auth/signin");

  const articles = await prisma.article.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">My Articles</h1>
      <CreateArticleForm userId={session.user.id} />
      <div className="mt-6 space-y-4">
        {articles.map(article => (
          <div key={article.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-700 mt-2">{article.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
