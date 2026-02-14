import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import statusMap from "../constant/borrowingStatus";
import { getAllBorrowings } from "../api/borrowingApi";
import type { Borrowing } from "../types/borrowing";

type SortOption =
  | "startTime"
  | "borrowerName"
  | "roomName"
  | "status";

export default function BorrowingHistoryPage() {
  const navigate = useNavigate();

  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterByDate, setFilterByDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("startTime");

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const data = await getAllBorrowings();
        setBorrowings(data);
      } catch (err) {
        console.error("Gagal mengambil data peminjaman", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  const filteredBorrowings = borrowings
    .filter((b) => {
      if (!search) return true;
      const keyword = search.toLowerCase();
      return (
        b.borrowerName.toLowerCase().includes(keyword) ||
        b.room.name.toLowerCase().includes(keyword)
      );
    })
    .filter((b) => {
      if (!filterByDate || !startDate || !endDate) return true;
      const borrowingDate = new Date(b.startTime);
      return (
        borrowingDate >= new Date(startDate) &&
        borrowingDate <= new Date(endDate)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "borrowerName":
          return a.borrowerName.localeCompare(b.borrowerName);
        case "roomName":
          return a.room.name.localeCompare(b.room.name);
        case "status":
          return a.status - b.status;
        case "startTime":
        default:
          return (
            new Date(a.startTime).getTime() -
            new Date(b.startTime).getTime()
          );
      }
    });

  return (
    <div className="page">
      <h1>Riwayat Peminjaman Ruangan</h1>

      <button onClick={() => navigate("/borrowings/create")}>
        Tambah Peminjaman
      </button>

      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          placeholder="Cari nama peminjam atau ruangan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={filterByDate}
            onChange={(e) => setFilterByDate(e.target.checked)}
          />{" "}
          Filter berdasarkan tanggal
        </label>

        {filterByDate && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </>
        )}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="startTime">Waktu Mulai</option>
          <option value="borrowerName">Nama Peminjam</option>
          <option value="roomName">Nama Ruangan</option>
          <option value="status">Status</option>
        </select>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : filteredBorrowings.length === 0 ? (
        <EmptyState
          title="Data tidak ditemukan"
          description="Coba ubah pencarian atau filter."
          buttonText="Reset"
          onClick={() => {
            setSearch("");
            setStartDate("");
            setEndDate("");
            setFilterByDate(false);
          }}
        />
      ) : (
        <div style={{ marginTop: 16 }}>
          {filteredBorrowings.map((b) => (
            <div
              key={b.id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                marginBottom: 8,
                borderRadius: 6,
              }}
            >
              <p><b>Peminjam:</b> {b.borrowerName}</p>
              <p><b>Ruangan:</b> {b.room.name}</p>
              <p><b>Tujuan:</b> {b.tujuan}</p>
              <p>
                <b>Waktu:</b>{" "}
                {new Date(b.startTime).toLocaleString()} –{" "}
                {new Date(b.endTime).toLocaleString()}
              </p>
              <p><b>Status:</b> {statusMap[b.status]}</p>

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
