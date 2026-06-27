import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistem Booking Ruang - Universitas Mulia Balikpapan",
  description:
    "Sistem peminjaman ruang kampus Universitas Mulia Balikpapan. Booking ruang kelas, laboratorium, dan aula secara online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <footer className="bg-[#561C24]/90 backdrop-blur-xl text-white/60 text-center py-8 text-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center text-white font-bold text-xs border border-white/15">
                  UM
                </div>
                <div className="text-left">
                  <p className="text-white/80 font-medium text-sm">
                    Universitas Mulia Balikpapan
                  </p>
                  <p className="text-white/40 text-xs">
                    Sistem Booking Ruang Kampus
                  </p>
                </div>
              </div>
              <p className="text-white/40">
                © 2026 Universitas Mulia Balikpapan. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
