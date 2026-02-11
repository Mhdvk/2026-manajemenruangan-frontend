import { useState } from "react"
import { roomSeeder } from "../data/roomSeeder"
import { createBorrowing } from "../api/borrowingApi"

export default function BorrowingForm() {
  const [purpose, setPurpose] = useState("")
  const [roomId, setRoomId] = useState<number | "">("")
  const [borrowerName, setBorrowerName] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!borrowerName || !roomId || !startTime || !endTime || !purpose) {
      setError("Semua field harus diisi")
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
    <form onSubmit={handleSubmit}>
      <label>
        Nama Peminjam
        <input
          value={borrowerName}
          onChange={(e) => setBorrowerName(e.target.value)}
        />
      </label>

      <label>
        Tujuan
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} />
      </label>

      <label>
        Ruangan
        <select
          value={roomId}
          onChange={(e) => setRoomId(Number(e.target.value))}
        >
          <option value="">-- pilih --</option>
          {roomSeeder.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Start Time
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>

      <label>
        End Time
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Pinjam"}
      </button>
    </form>
  )
}
