"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconClock, IconArrowLeft, IconCircleCheck, IconCancel, IconRefresh } from "@tabler/icons-react";
import { useAuth } from "../lib/auth-context";
import { getBookingsByEmail, Booking } from "../lib/booking-store";

const statusStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  pending: { bg: "bg-amber-100 border-amber-300", text: "text-amber-700", icon: IconClock },
  dikonfirmasi: { bg: "bg-emerald-50 light:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900", text: "text-emerald-700 dark:text-emerald-400", icon: IconCircleCheck },
  ditolak: { bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900", text: "text-rose-700 dark:text-rose-400", icon: IconCancel },
};

const ruanganLabels: Record<string, string> = {
  ruang_rapat_a: "Ruang Rapat Kreatif A",
  ruang_rapat_b: "Ruang Rapat Eksekutif B",
  booth_call: "Booth Telepon Kedap Suara",
  meja_kerja_t: "Meja Kerja Tim Tengah",
};

export default function StatusPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom, #f8f3ec 0%, #f5efe6 10%, #ede4d4 20%, #e4d7c3 30%, #dccfb9 40%, #d4c4ac 48%, #c8b89a 50%, #b09078 53%, #9a7060 57%, #8a5a50 62%, #7a4040 68%, #6D2931 75%, #622530 82%, #5a1f25 88%, #511a20 94%, #4a1520 100%)",
        }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const bookingHistory = getBookingsByEmail(user.email);

  return (
    <div
      className="min-h-screen font-sans text-zinc-900 relative"
      style={{
        background: "linear-gradient(to bottom, #f8f3ec 0%, #f5efe6 10%, #ede4d4 20%, #e4d7c3 30%, #dccfb9 40%, #d4c4ac 48%, #c8b89a 50%, #b09078 53%, #9a7060 57%, #8a5a50 62%, #7a4040 68%, #6D2931 75%, #622530 82%, #5a1f25 88%, #511a20 94%, #4a1520 100%)",
      }}
    >
      

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookingHistory.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#E8D8C4] rounded-full flex items-center justify-center mx-auto mb-4">
              <IconClock size={32} className="text-[#6D2932]" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-[#561c24]">Belum Ada Booking</h2>
            <p className="text-[#561c24] mb-6">Anda belum memiliki riwayat pemesanan ruangan.</p>
            <Link href="/booking" className="inline-flex items-center gap-2 bg-[#6D2932] hover:bg-[#561C24] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all">
              Buat Booking Sekarang
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#561C24]">Riwayat Booking Anda</h2>
              <Link href="/booking" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#561C24] hover:text-white transition-colors">
                <IconRefresh size={16} />
                Booking Baru
              </Link>
            </div>

            <div className="space-y-4">
              {bookingHistory.map((booking) => {
                const style = statusStyles[booking.status];
                const StatusIcon = style.icon;
                return (
                  <div key={booking.id} className="bg-[#E8D8C4] rounded-2xl shadow-md p-5">
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                      <div className="flex gap-4 items-start">
                        <div className={`p-2.5 rounded-xl border ${style.bg} ${style.text} flex-shrink-0 mt-1`}>
                          <StatusIcon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-base font-bold text-[#561C24]">{ruanganLabels[booking.ruangan] || booking.ruangan}</h3>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                              {booking.status === "dikonfirmasi" ? "Dikonfirmasi" : booking.status === "pending" ? "Menunggu" : "Ditolak"}
                            </span>
                          </div>
                          <p className="text-sm text-[#6D2932]">
                            {booking.tanggal} &bull; {booking.waktu_mulai} - {booking.waktu_selesai}
                          </p>
                          <p className="text-xs text-[#6D2932]/70 mt-1">
                            Kode Booking: {booking.id}
                          </p>
                          {booking.keperluan && (
                            <p className="text-xs text-[#6D2932]/80 mt-1 italic">
                              &quot;{booking.keperluan}&quot;
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
