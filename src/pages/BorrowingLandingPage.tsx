import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function BorrowingLandingPage() {
  const navigate = useNavigate();
  const borrowings: any[] = [];

  return (
    <div className="page">
      <h1>Peminjaman Ruangan</h1>

      {borrowings.length === 0 ? (
        <EmptyState
          title="Belum ada peminjaman"
          description="Silakan buat peminjaman ruangan terlebih dahulu."
          buttonText="Tambah Peminjaman Ruangan"
          onClick={() => navigate("/borrowings/create")}
        />
      ) : (
        <p>Table peminjaman di sini (next step)</p>
      )}
    </div>
  );
}
