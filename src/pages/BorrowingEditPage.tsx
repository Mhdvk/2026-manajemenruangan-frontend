import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBorrowingById, updateBorrowing } from "../api/borrowingApi";
import { getAllRooms } from "../api/roomApi";

interface Room {
  id: number;
  name: string;
}

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

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      getBorrowingById(Number(id)),
      getAllRooms(),
    ])
      .then(([borrowing, roomsData]) => {
        setForm({
          borrowerName: borrowing.borrowerName,
          startTime: borrowing.startTime.slice(0, 16),
          endTime: borrowing.endTime.slice(0, 16),
          roomId: borrowing.room.id,
          tujuan: borrowing.tujuan,
        });
        setRooms(roomsData);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const isTimeInvalid = Boolean(
    form.startTime &&
      form.endTime &&
      new Date(form.startTime) >= new Date(form.endTime)
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    if (isTimeInvalid) {
      alert("Waktu selesai harus lebih besar dari waktu mulai");
      return;
    }

    await updateBorrowing(Number(id), {
      borrowerName: form.borrowerName,
      startTime: form.startTime,
      endTime: form.endTime,
      roomId: form.roomId,
      tujuan: form.tujuan,
    });

    alert("Peminjaman berhasil diupdate");
    navigate(`/borrowings/${id}`);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1>Edit Peminjaman</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Nama Peminjam
          <input
            value={form.borrowerName}
            onChange={(e) =>
              setForm({ ...form, borrowerName: e.target.value })
            }
            required
          />
        </label>

        <label>
          Ruangan
          <select
            value={form.roomId}
            onChange={(e) =>
              setForm({ ...form, roomId: Number(e.target.value) })
            }
            required
          >
            <option value="">-- pilih ruangan --</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Waktu Mulai
          <input
            type="datetime-local"
            value={form.startTime}
            onChange={(e) =>
              setForm({ ...form, startTime: e.target.value })
            }
            required
          />
        </label>

        <label>
          Waktu Selesai
          <input
            type="datetime-local"
            value={form.endTime}
            onChange={(e) =>
              setForm({ ...form, endTime: e.target.value })
            }
            required
          />
        </label>

        {isTimeInvalid && (
          <p style={{ color: "red", marginTop: "4px" }}>
            Waktu mulai harus lebih awal dari waktu selesai
          </p>
        )}

        <label>
          Tujuan
          <input
            value={form.tujuan}
            onChange={(e) =>
              setForm({ ...form, tujuan: e.target.value })
            }
            required
          />
        </label>

        <button type="submit" disabled={isTimeInvalid}>
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
