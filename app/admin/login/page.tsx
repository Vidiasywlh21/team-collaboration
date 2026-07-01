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
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(to bottom, #f8f3ec 0%, #f5efe6 10%, #ede4d4 20%, #e4d7c3 30%, #dccfb9 40%, #d4c4ac 48%, #c8b89a 50%, #b09078 53%, #9a7060 57%, #8a5a50 62%, #7a4040 68%, #6D2931 75%, #622530 82%, #5a1f25 88%, #511a20 94%, #4a1520 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#561c24] hover:text-white mb-8 transition-colors"
        >
          <IconArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        <div className="bg-[#E8D8C4] rounded-2xl shadow-xl border border-[#C7B7A3] p-8">
          {/* Admin Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#561C24] rounded-full">
              <IconShieldLock size={20} className="text-[#E8D8C4]" />
              <span className="text-sm font-semibold text-[#E8D8C4]">Portal Admin</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#561C24] mb-2">Admin Login</h1>
            <p className="text-[#6D2932] text-sm">
              Masuk ke dashboard administrasi SinergiSpace
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-100 border border-rose-300 rounded-xl text-rose-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#561C24] mb-2">
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
                className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#561C24] mb-2">
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
                className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#6D2932] hover:bg-[#561C24] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all mt-6"
            >
              <IconLogin size={18} />
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#C7B7A3]">
            <p className="text-center text-sm text-[#6D2932]">
              Bukan admin?{" "}
              <Link href="/login" className="text-[#561C24] hover:underline font-medium">
                Login sebagai user
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-white/50 rounded-lg">
            <p className="text-xs text-[#6D2932] text-center">
              <strong>Demo:</strong> admin@sinergispace.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
