"use client";

import { useState } from "react";
import { useAuth } from "../lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconLogin, IconUserPlus, IconArrowLeft, IconMail, IconLock, IconUser } from "@tabler/icons-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !nama)) {
      setError("Semua field harus diisi");
      return;
    }

    if (isLogin) {
      const success = login(email, password);
      if (success) {
        // Check user role after login
        const sessionData = localStorage.getItem("sinergispace_session");
        const userData = sessionData ? JSON.parse(sessionData) : null;
        
        if (userData?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/booking");
        }
      } else {
        setError("Email atau password salah");
      }
    } else {
      const success = register(email, nama, password);
      if (success) {
        router.push("/booking");
      } else {
        setError("Email sudah terdaftar");
      }
    }
  };

  return (
    <div
      className="min-h-screen font-sans flex items-center justify-center p-4 text-zinc-900 dark:text-zinc-100"
      style={{
        background: "linear-gradient(to bottom, #f8f3ec 0%, #f5efe6 10%, #ede4d4 20%, #e4d7c3 30%, #dccfb9 40%, #d4c4ac 48%, #c8b89a 50%, #b09078 53%, #9a7060 57%, #8a5a50 62%, #7a4040 68%, #6D2931 75%, #622530 82%, #5a1f25 88%, #511a20 94%, #4a1520 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-[#561C24] hover:text-white mb-8 transition-colors">
          <IconArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        <div className="bg-[#E8D8C4] rounded-2xl border border-[#C7B7A3] shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#561C24] rounded-xl text-[#E8D8C4]">
                {isLogin ? <IconLogin size={24} /> : <IconUserPlus size={24} />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#561C24]">{isLogin ? "Masuk" : "Daftar"}</h1>
                <p className="text-[#6D2932] text-sm">
                  {isLogin ? "Masuk ke akun Anda untuk melanjutkan" : "Buat akun baru untuk mulai booking"}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-100 border border-rose-300 rounded-xl text-sm text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="nama" className="block text-sm font-semibold text-[#561C24] mb-2">
                    <span className="flex items-center gap-1.5">
                      <IconUser size={14} />
                      Nama Lengkap
                    </span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#561C24] mb-2">
                  <span className="flex items-center gap-1.5">
                    <IconMail size={14} />
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6D2932] hover:bg-[#561C24] text-white rounded-xl text-sm font-semibold shadow-lg transition-all"
              >
                {isLogin ? (
                  <>
                    <IconLogin size={16} />
                    Masuk
                  </>
                ) : (
                  <>
                    <IconUserPlus size={16} />
                    Daftar
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-sm text-[#561C24] hover:underline font-medium"
              >
                {isLogin ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
