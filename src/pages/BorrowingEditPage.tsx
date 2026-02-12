import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBorrowingById, updateBorrowing } from "../api/borrowingApi";

export default function BorrowingEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    borrowerName: "",
    startTime: "",
    endTime: "",
    roomId: 0,
    tujuan: "",
  });

  useEffect(() => {
    if (!id) return;

    getBorrowingById(Number(id)).then((data) => {
      setForm({
        borrowerName: data.borrowerName,
        startTime: data.startTime,
        endTime: data.endTime,
        roomId: data.room.id,
        tujuan: data.tujuan,
      });
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    await updateBorrowing(Number(id), form);
    alert("Peminjaman berhasil diupdate");
    navigate(`/borrowings/${id}`);
  }

  return (
    <div className="page">
      <h1>Edit Peminjaman</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={form.borrowerName}
          onChange={(e) =>
            setForm({ ...form, borrowerName: e.target.value })
          }
          placeholder="Nama Peminjam"
        />

        <input
          type="datetime-local"
          value={form.startTime}
          onChange={(e) =>
            setForm({ ...form, startTime: e.target.value })
          }
        />

        <input
          type="datetime-local"
          value={form.endTime}
          onChange={(e) =>
            setForm({ ...form, endTime: e.target.value })
          }
        />

        <input
          value={form.tujuan}
          onChange={(e) =>
            setForm({ ...form, tujuan: e.target.value })
          }
          placeholder="Tujuan"
        />

        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}
