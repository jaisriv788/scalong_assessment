'use client';

import { useRouter } from 'next/navigation';
import { ShieldCheck, LayoutDashboard, PencilLine } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/api/auth/signin?callbackUrl=/redirect');
  };
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-white flex flex-col items-center justify-center px-6 py-12">
      <section className="text-center mb-10">
        <div className="text-6xl font-bold text-indigo-700 mb-4">RBAC Dashboard</div>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Full-Stack Next.js 14 App with Authentication, Role-Based Access, and Database Management.
        </p>
      </section>

      <section className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-5xl w-full mb-10">
        <FeatureCard
          icon={<ShieldCheck className="w-10 h-10 text-indigo-600" />}
          title="Secure Access"
          description="Credential-based login with role protection for ADMIN and USER."
        />
        <FeatureCard
          icon={<LayoutDashboard className="w-10 h-10 text-indigo-600" />}
          title="Admin Dashboard"
          description="Admins can view all users and update their roles."
        />
        <FeatureCard
          icon={<PencilLine className="w-10 h-10 text-indigo-600" />}
          title="Articles Management"
          description="Users can manage their own articles; admins can manage all."
        />
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full text-left">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Key Features:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>🛡️ NextAuth.js with Credential Provider</li>
          <li>🔒 Middleware-based route protection</li>
          <li>🧠 Prisma ORM with User and Article models</li>
          <li>📁 Modern App Router architecture</li>
          <li>🧪 Seed script & local development setup</li>
        </ul>
      </section>

      <div className="mt-10">
        <button
          onClick={handleSignIn}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-lg shadow-lg transition duration-300"
        >
          Sign In to Get Started
        </button>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <div className="mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
