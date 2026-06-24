import { z } from "zod";

export const bookingSchema = z.object({
  nama: z.string().min(3),
  // tambahkan aturan validasi lainnya di sini
});