import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBorrowing, getBorrowingById } from "../api/borrowingApi";
import statusMap from "../constant/borrowingStatus";
import type { Borrowing } from "../types/borrowing";

export default function BorrowingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [borrowing, setBorrowing] = useState<Borrowing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getBorrowingById(Number(id))
      .then(setBorrowing)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!id) return;

    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus peminjaman?");
    if (!confirmDelete) return;

    await deleteBorrowing(Number(id));
    alert("Peminjaman berhasil dihapus");
    navigate("/");
  }

  if (loading) return <p>Loading...</p>;
  if (!borrowing) return <p>Data tidak ditemukan</p>;

  return (
    <div className="page">
      <button onClick={() => navigate(`/borrowings`)}>Kembali</button>
      <h1>Detail Peminjaman</h1>

      <p>
        <strong>Peminjam:</strong> {borrowing.borrowerName}
      </p>
      <p>
        <strong>Ruangan:</strong> {borrowing.room.name}
      </p>
      <p>
        <strong>Tujuan:</strong> {borrowing.tujuan}
      </p>
      <p>
        <strong>Status:</strong> {statusMap[borrowing.status] ?? "Unknown"}
      </p>
      <p>
        <strong>Waktu:</strong> {new Date(borrowing.startTime).toLocaleString()}{" "}
        – {new Date(borrowing.endTime).toLocaleString()}
      </p>

      <button onClick={() => navigate(`/borrowings/${id}/edit`)}>Edit</button>

      <button
        onClick={handleDelete}
        style={{ marginLeft: "8px", color: "red" }}
      >
        Hapus
      </button>
    </div>
  );
}
