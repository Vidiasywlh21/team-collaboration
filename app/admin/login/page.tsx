"use client";

import { useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconShieldLock, IconMail, IconLock, IconLogin, IconArrowLeft } from "@tabler/icons-react";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(formData.email, formData.password);
    if (success) {
      // Get user data to check role
      const sessionData = localStorage.getItem("sinergispace_session");
      const user = sessionData ? JSON.parse(sessionData) : null;
      
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        setError("Akses ditolak. Anda bukan admin.");
        localStorage.removeItem("sinergispace_session");
      }
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          <IconArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8">
          {/* Admin Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-full border border-indigo-200 dark:border-indigo-800">
              <IconShieldLock size={20} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Portal Admin</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Admin Login</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Masuk ke dashboard administrasi SinergiSpace
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-600 dark:text-rose-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <IconMail size={14} />
                  Email Admin
                </span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@sinergispace.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <IconLock size={14} />
                  Password
                </span>
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Masukkan password admin"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all mt-6"
            >
              <IconLogin size={18} />
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Bukan admin?{" "}
              <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                Login sebagai user
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
              <strong>Demo:</strong> admin@sinergispace.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
