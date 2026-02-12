import { useNavigate } from "react-router-dom"
import "../landing.css"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Sistem Manajemen Peminjaman Ruangan</h1>
        <p className="subtitle">
          Aplikasi untuk mengelola peminjaman ruangan.
          Dibuat oleh Muhammad Mahdavikia Abdillah 
        </p>

        <div className="button-group">
          <button
            className="primary"
            onClick={() => navigate("/borrowings/create")}
          >
            Tambah Peminjaman
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/borrowings")}
          >
            Riwayat Peminjaman
          </button>

        </div>
      </div>
    </div>
  )
}
