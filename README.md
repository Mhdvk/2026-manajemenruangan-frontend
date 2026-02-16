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

---

## 📁 Struktur Folder
src/
├── api/ # Axios & API handler
│ ├── axiosInstance.ts
│ ├── borrowingApi.ts
│ └── roomApi.ts
│
├── components/ # Komponen reusable
│ ├── Navbar.tsx
│ └── EmptyState.tsx
│
├── pages/ # Halaman aplikasi
│ ├── LandingPage.tsx
│ ├── RoomPage.tsx
│ ├── BorrowingFormPage.tsx
│ ├── BorrowingHistoryPage.tsx
│ ├── BorrowingDetailPage.tsx
│ ├── BorrowingEditPage.tsx
│ └── BorrowingApprovalPage.tsx
│
├── types/ # TypeScript interfaces
│ ├── room.ts
│ └── borrowing.ts
│
├── constant/
│ └── borrowingStatus.ts
│
├── App.tsx
└── main.tsx

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
