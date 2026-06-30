export interface Anggota {
  nama: string;
  nim: string;
}

export interface Booking {
  id: string;
  email: string;
  nama: string;
  nim: string;
  telepon: string;
  fakultas: string;
  ruangan: string;
  tanggal: string;
  waktu_mulai: string;
  waktu_selesai: string;
  keperluan?: string;
  anggota?: Anggota[];
  status: "dikonfirmasi" | "ditolak" | "pending";
  created_at: string;
}

const STORAGE_KEY = "sinergispace_bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getBookingsByEmail(email: string): Booking[] {
  return getBookings().filter((b) => b.email === email);
}

export function saveBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function checkTimeOverlap(
  ruangan: string,
  tanggal: string,
  waktu_mulai: string,
  waktu_selesai: string
): boolean {
  const bookings = getBookings();
  
  const activeBookings = bookings.filter(
    (b) => b.ruangan === ruangan && b.tanggal === tanggal && b.status === "dikonfirmasi"
  );

  for (const booking of activeBookings) {
    const existingStart = booking.waktu_mulai;
    const existingEnd = booking.waktu_selesai;

    if (waktu_mulai < existingEnd && waktu_selesai > existingStart) {
      return true;
    }
  }

  return false;
}

export function generateBookingId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `INV-${year}-${random}`;
}
