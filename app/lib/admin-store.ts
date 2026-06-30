import { Booking } from "./booking-store";

export interface Room {
  id: string;
  value: string;
  label: string;
  fakultas: string;
  kapasitas?: number;
  fasilitas?: string[];
  created_at: string;
}

const ROOMS_KEY = "sinergispace_rooms";
const ADMIN_KEY = "sinergispace_admin";

// Initialize default admin account
export function initializeAdmin(): void {
  if (typeof window === "undefined") return;
  
  const usersKey = "sinergispace_users";
  const users = localStorage.getItem(usersKey);
  const userList = users ? JSON.parse(users) : [];
  
  // Check if admin already exists
  const adminExists = userList.some((u: any) => u.role === "admin");
  
  if (!adminExists) {
    // Add default admin account
    userList.push({
      email: "admin@sinergispace.com",
      nama: "Administrator",
      password: "admin123",
      role: "admin"
    });
    localStorage.setItem(usersKey, JSON.stringify(userList));
  }
}

// Room Management
export function getRooms(): Room[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(ROOMS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveRoom(room: Room): void {
  const rooms = getRooms();
  const index = rooms.findIndex((r) => r.id === room.id);
  
  if (index >= 0) {
    rooms[index] = room;
  } else {
    rooms.push(room);
  }
  
  localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
}

export function deleteRoom(id: string): void {
  const rooms = getRooms();
  const filtered = rooms.filter((r) => r.id !== id);
  localStorage.setItem(ROOMS_KEY, JSON.stringify(filtered));
}

export function generateRoomId(): string {
  return `ROOM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Booking Management for Admin
export function getAllBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("sinergispace_bookings");
  return data ? JSON.parse(data) : [];
}

export function updateBookingStatus(
  bookingId: string,
  status: "dikonfirmasi" | "ditolak" | "pending"
): boolean {
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === bookingId);
  
  if (index >= 0) {
    bookings[index].status = status;
    localStorage.setItem("sinergispace_bookings", JSON.stringify(bookings));
    return true;
  }
  
  return false;
}

export function getBookingsByStatus(status: "dikonfirmasi" | "ditolak" | "pending"): Booking[] {
  return getAllBookings().filter((b) => b.status === status);
}

export function getBookingStats() {
  const bookings = getAllBookings();
  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    dikonfirmasi: bookings.filter((b) => b.status === "dikonfirmasi").length,
    ditolak: bookings.filter((b) => b.status === "ditolak").length,
  };
}
