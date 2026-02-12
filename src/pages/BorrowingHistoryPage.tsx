import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import statusMap from "../constant/borrowingStatus";
import { getAllBorrowings } from "../api/borrowingApi";

interface Room {
  id: number;
  name: string;
}

interface Borrowing {
  id: number;
  borrowerName: string;
  startTime: string;
  endTime: string;
  tujuan: string;
  status: number;
  room: Room;
}

export default function BorrowingHistoryPage() {
  const navigate = useNavigate();
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const data = await getAllBorrowings();
        setBorrowings(data);
      } catch (error) {
        console.error("Gagal mengambil data peminjaman:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  return (
    <div className="page">
      <h1>Peminjaman Ruangan</h1>

      <button onClick={() => navigate("/borrowings/create")}>
        Tambah Peminjaman Ruangan
      </button>

      {loading ? (
        <p>Loading data...</p>
      ) : borrowings.length === 0 ? (
        <EmptyState
          title="Belum ada peminjaman"
          description="Silakan buat peminjaman ruangan terlebih dahulu."
          buttonText="Tambah Peminjaman Ruangan"
          onClick={() => navigate("/borrowings/create")}
        />
      ) : (
        <div style={{ marginTop: "16px" }}>
          <h2>Daftar Peminjaman</h2>

          {borrowings.map((b) => (
            <div
              key={b.id}
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                marginBottom: "8px",
                borderRadius: "6px",
              }}
            >
              <p>
                <strong>Peminjam:</strong> {b.borrowerName}
              </p>
              <p>
                <strong>Ruangan:</strong> {b.room.name}
              </p>
              <p>
                <strong>Tujuan:</strong> {b.tujuan}
              </p>
              <p>
                <strong>Waktu:</strong> {new Date(b.startTime).toLocaleString()}{" "}
                – {new Date(b.endTime).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {statusMap[b.status] ?? "Unknown"}
              </p>
              <button onClick={() => navigate(`/borrowings/${b.id}`)}>
                Detail
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
