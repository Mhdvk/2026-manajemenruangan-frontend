import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Sistem Manajemen Peminjaman Ruangan
        </h1>

        <p className="text-gray-600 mb-8">
          Aplikasi untuk mengelola peminjaman ruangan.
          <br />
          Dibuat oleh <span className="font-medium">Muhammad Mahdavikia Abdillah</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/borrowings/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Tambah Peminjaman
          </button>

          <button
            onClick={() => navigate("/borrowings")}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition"
          >
            Riwayat Peminjaman
          </button>
        </div>
      </div>
    </div>
  );
}
