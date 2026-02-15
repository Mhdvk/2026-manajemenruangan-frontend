import { useEffect, useState } from "react"
import { createBorrowing } from "../api/borrowingApi"
import { getAllRooms } from "../api/roomApi"

interface Room {
  id: number
  name: string
}

export default function BorrowingForm() {
  const [purpose, setPurpose] = useState("")
  const [roomId, setRoomId] = useState<number | "">("")
  const [borrowerName, setBorrowerName] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    getAllRooms()
      .then(setRooms)
      .catch(() => setError("Gagal mengambil data ruangan"))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!borrowerName || !roomId || !startTime || !endTime || !purpose) {
      setError("Semua field harus diisi")
      setLoading(false)
      return
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setError("Waktu selesai harus lebih besar dari waktu mulai")
      setLoading(false)
      return
    }

    try {
      await createBorrowing({
        borrowerName,
        roomId: Number(roomId),
        startTime,
        endTime,
        tujuan: purpose,
      })

      alert("Berhasil menambahkan peminjaman!")

      setPurpose("")
      setRoomId("")
      setBorrowerName("")
      setStartTime("")
      setEndTime("")
    } catch (err: any) {
      setError(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow space-y-4"
      >
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Isi  Form Peminjaman Ruangan
        </h1>

        <div>
          <label className="block text-sm font-medium mb-1">
            Nama Peminjam
          </label>
          <input
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            placeholder="Masukkan nama peminjam"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tujuan
          </label>
          <input
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            placeholder="Contoh: Rapat organisasi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Ruangan
          </label>
          <select
            value={roomId}
            onChange={(e) =>
              setRoomId(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full border px-3 py-2 rounded bg-white focus:outline-none focus:ring"
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
          <label className="block text-sm font-medium mb-1">
            Waktu Mulai
          </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Waktu Selesai
          </label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Menyimpan..." : "Ajukan Peminjaman"}
        </button>
      </form>
    </div>
  )
}
