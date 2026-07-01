import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

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
        <Providers>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <footer className="bg-[#561C24]/90 backdrop-blur-xl text-white/60 text-center py-8 text-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center text-white font-bold text-xs">
                    UM
                  </div>
                  <span className="font-bold text-white/80">UMSpace</span>
                </div>
                <p className="text-white/40 text-xs">
                  &copy; {new Date().getFullYear()} Universitas Mulia Team Collaboration Hak Cipta Dilindungi Undang-Undang.
                </p>
                <div className="flex gap-4 text-xs font-medium">
                  <Link href="/bantuan" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
                  <Link href="/bantuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
