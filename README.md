# Sistem Manajemen Peminjaman Ruangan – Backend

## Deskripsi
Frontend aplikasi Sistem Manajemen Peminjaman Ruangan Kampus.
Aplikasi ini menyediakan antarmuka pengguna untuk melakukan peminjaman ruangan, melihat daftar ruangan, mengelola histori peminjaman, serta mengubah status peminjaman sesuai dengan role pengguna (Pengaju dan Pengelola).

Frontend terhubung dengan Backend ASP.NET Core Web API.

---

## Teknologi
- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Fetch API

---

## Instalasi

1. Clone Repository
git clone https:/calvinkurniawann/github.com/calvinkurniawann/2026-ManajemenRuangan-frontend.git
cd 2026-ManajemenRuangan-frontend

2. Install Dependency
npm install

---

## Environment Configuration
Pastikan backend sudah berjalan terlebih dahulu.
Edit file berikut jika perlu menyesuaikan URL backend:
src/api/api.ts
Ubah BASE_URL sesuai alamat backend, misalnya:
const BASE_URL = "http://localhost:5045/api";

---

## Panduan Menjalankan Aplikasi

1. Jalankan Aplikasi
npm run dev

2. Akses Aplikasi
Buka browser dan akses:
http://localhost:5173

## Fitur Utama 

### Role Selection
- Pemilihan role: Pengaju atau Pengelola

### Pengaju
- Melihat daftar ruangan
- Membuat peminjaman ruangan
- Melihat histori peminjaman
- Filter dan pencarian histori
- Edit peminjaman (hanya jika status Pending)
- Hapus peminjaman
- Validasi konflik ruangan pada tanggal yang sama

### Pengelola
- Melihat seluruh peminjaman
- Approve atau Reject peminjaman
- CRUD Master Data Ruangan