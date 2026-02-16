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
  <div className="min-h-screen bg-slate-100 px-4 py-10">
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl bg-white shadow-md">
        <div className="border-b px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-800">
            Edit Peminjaman
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Perbarui data peminjaman ruangan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                Nama Peminjam
              </label>
              <input
                value={form.borrowerName}
                onChange={(e) =>
                  setForm({ ...form, borrowerName: e.target.value })
                }
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                Ruangan
              </label>
              <select
                value={form.roomId}
                onChange={(e) =>
                  setForm({ ...form, roomId: Number(e.target.value) })
                }
                required
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- pilih ruangan --</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                Waktu Mulai
              </label>
              <input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) =>
                  setForm({ ...form, startTime: e.target.value })
                }
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                Waktu Selesai
              </label>
              <input
                type="datetime-local"
                value={form.endTime}
                onChange={(e) =>
                  setForm({ ...form, endTime: e.target.value })
                }
                required
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  isTimeInvalid
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {isTimeInvalid && (
                <p className="mt-1 text-xs text-red-600">
                  Waktu selesai harus lebih besar dari waktu mulai
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                Tujuan
              </label>
              <input
                value={form.tujuan}
                onChange={(e) =>
                  setForm({ ...form, tujuan: e.target.value })
                }
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isTimeInvalid}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}
