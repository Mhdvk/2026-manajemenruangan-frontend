# Sistem Manajemen Peminjaman Ruangan — Frontend

Frontend aplikasi **Sistem Manajemen Peminjaman Ruangan**  
dibangun menggunakan **React + TypeScript + Vite** dan **Tailwind CSS**.

Aplikasi ini digunakan untuk:
- Melihat daftar ruangan
- Mengajukan peminjaman ruangan
- Melihat riwayat peminjaman
- Mengelola peminjaman (detail, edit)
- (Admin) Persetujuan peminjaman

---

## 🚀 Tech Stack

-  **React** (Vite)
-  **TypeScript**
-  **Tailwind CSS**
-  **React Router DOM**
-  **Axios**
-  **Node.js & NPM**

## 📄 Halaman Utama (Pages)

Aplikasi ini memiliki beberapa halaman utama sebagai berikut:

- **Landing Page**  
  Halaman awal aplikasi yang berisi gambaran umum sistem dan navigasi utama.

- **Daftar Ruangan**  
  Menampilkan seluruh ruangan yang tersedia beserta informasi lokasi dan kapasitas.

- **Form Peminjaman Ruangan**  
  Digunakan oleh pengguna untuk mengajukan peminjaman ruangan.

- **Riwayat Peminjaman**  
  Menampilkan seluruh data peminjaman yang tersimpan, dilengkapi dengan:
  - Searching (nama peminjam & ruangan)
  - Filtering berdasarkan rentang waktu
  - Sorting data (status, waktu, nama peminjam, nama ruangan)

- **Detail Peminjaman**  
  Menampilkan informasi detail dari satu data peminjaman.

- **Edit Peminjaman**  
  Memungkinkan pengguna mengubah data peminjaman yang sudah dibuat.

- **Approval Peminjaman (Admin)**  
  Halaman khusus admin untuk menyetujui atau menolak peminjaman ruangan.

---

Fitur Utama
📌 Peminjaman
Ajukan peminjaman ruangan
Validasi waktu (start < end)
Otomatis status Pending

📌 Riwayat Peminjaman
Search (nama peminjam / ruangan)
Filter berdasarkan tanggal (checkbox)
Sorting:
Waktu mulai
Nama peminjam
Nama ruangan
Status

📌 Edit Peminjaman
Edit peminjam, waktu, ruangan, tujuan
Jika waktu/ruangan berubah → status otomatis kembali Pending

📌 Ruangan
Menampilkan seluruh ruangan
Nama, lokasi, kapasitas

##  Cara Menjalankan Frontend
```bash
npm install
npm run dev
Pastikan backend sudah berjalan agar data dapat ditampilkan dengan benar.
