# Admin Panel Setup - SinergiSpace

## Akun Admin Default

**Email:** admin@sinergispace.com  
**Password:** admin123  
**Role:** admin

Akun admin akan otomatis dibuat saat pertama kali mengakses halaman admin.

## Struktur Admin Panel

### 1. Admin Login (`/admin/login`)
- Portal login khusus untuk admin
- Badge "Portal Admin" untuk membedakan dari login user
- Validasi role-based access
- Demo credentials ditampilkan di halaman

### 2. Dashboard (`/admin/dashboard`)
- Statistik booking: Total, Pending, Disetujui, Ditolak
- Tabel booking terbaru (5 terakhir)
- Cards dengan icon dan warna berbeda untuk setiap status

### 3. Verifikasi Booking (`/admin/verifikasi`)
- Tabel lengkap semua booking
- Filter by status: All, Pending, Disetujui, Ditolak
- Aksi: Lihat Detail, Setujui, Tolak
- Modal detail booking dengan info lengkap termasuk anggota kelompok
- Quick action buttons di tabel

### 4. Manajemen Ruangan (`/admin/ruangan`)
- CRUD ruangan (Create, Read, Update, Delete)
- Form modal untuk tambah/edit ruangan
- Field: Nama Ruangan, Kode Ruangan, Fakultas, Kapasitas, Fasilitas
- Tabel dengan aksi Edit dan Hapus
- Confirm dialog sebelum delete

### 5. Laporan (`/admin/laporan`)
- Filter by bulan dan status
- Statistik summary dengan angka besar
- Tabel data booking yang terfilter
- Export to CSV untuk download laporan

## Komponen Utama

### AdminSidebar
- Navigasi menu dengan icon
- User info card
- Active state untuk menu
- Responsive dengan mobile menu
- Logout button

### Role-Based Access
- User dengan role "admin" → diarahkan ke `/admin/dashboard`
- User dengan role "user" → diarahkan ke `/booking`
- Middleware di setiap halaman admin untuk cek role
- Redirect ke login jika bukan admin

## Perubahan Sistem

### Status Booking
Sebelumnya: `"dikonfirmasi" | "ditolak"`  
Sekarang: `"dikonfirmasi" | "ditolak" | "pending"`

Semua booking baru dibuat dengan status `"pending"` dan menunggu verifikasi admin.

### User Interface
- Interface `User` dan `StoredUser` ditambahkan field `role?: "user" | "admin"`
- Interface `Booking` ditambahkan field `nim`, `fakultas`, `anggota`
- Interface `Room` untuk manajemen data ruangan

### File Struktur
```
app/
├── admin/
│   ├── layout.tsx          # Admin layout with initialization
│   ├── login/
│   │   └── page.tsx        # Admin login page
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard with stats
│   ├── verifikasi/
│   │   └── page.tsx        # Booking verification
│   ├── ruangan/
│   │   └── page.tsx        # Room management (CRUD)
│   └── laporan/
│       └── page.tsx        # Reports & export
├── components/
│   ├── AdminSidebar.tsx    # Sidebar navigation
│   └── ...
├── lib/
│   ├── admin-store.ts      # Admin functions & room management
│   └── auth-context.tsx    # Updated with role support
```

## Fitur Admin

✅ Role-based authentication  
✅ Dashboard dengan statistik real-time  
✅ Verifikasi booking (approve/reject)  
✅ CRUD manajemen ruangan  
✅ Laporan dengan filter & export CSV  
✅ Responsive design  
✅ Dark mode support  
✅ Konsisten dengan desain user interface  

## Cara Akses

1. Buka `/admin/login`
2. Login dengan credentials admin
3. Akan diarahkan ke dashboard admin
4. Gunakan sidebar untuk navigasi

## Testing

1. Login sebagai admin di `/admin/login`
2. Verifikasi booking yang pending
3. Tambah/edit/hapus ruangan di manajemen ruangan
4. Export laporan dalam format CSV
5. Logout dan coba login sebagai user biasa → akan diarahkan ke `/booking`
