import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EmptyState from "../components/EmptyState"
import statusMap from "../constant/borrowingStatus"
import { getAllBorrowings } from "../api/borrowingApi"
import type { Borrowing } from "../types/borrowing"

type SortOption =
  | "startTime"
  | "borrowerName"
  | "roomName"
  | "status"

export default function BorrowingHistoryPage() {
  const navigate = useNavigate()

  const [borrowings, setBorrowings] = useState<Borrowing[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [filterByDate, setFilterByDate] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("startTime")

  useEffect(() => {
    getAllBorrowings()
      .then(setBorrowings)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!filterByDate) {
      setStartDate("")
      setEndDate("")
    }
  }, [filterByDate])

  const filteredBorrowings = borrowings
    .filter((b) => {
      if (!search) return true
      const key = search.toLowerCase()
      return (
        b.borrowerName.toLowerCase().includes(key) ||
        b.room.name.toLowerCase().includes(key)
      )
    })
    // FILTER DATE
    .filter((b) => {
      if (!filterByDate || !startDate || !endDate) return true
      const date = new Date(b.startTime)
      return date >= new Date(startDate) && date <= new Date(endDate)
    })
    // SORT
    .sort((a, b) => {
      switch (sortBy) {
        case "borrowerName":
          return a.borrowerName.localeCompare(b.borrowerName)
        case "roomName":
          return a.room.name.localeCompare(b.room.name)
        case "status":
          return a.status - b.status
        case "startTime":
        default:
          return (
            new Date(a.startTime).getTime() -
            new Date(b.startTime).getTime()
          )
      }
    })

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Riwayat Peminjaman Ruangan
        </h1>

        <button
          onClick={() => navigate("/borrowings/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Peminjaman
        </button>
      </div>

      <div className="bg-white border rounded-lg p-4 mb-6 space-y-4">
        <input
          type="text"
          placeholder="Cari nama peminjam atau ruangan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex flex-wrap gap-6 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filterByDate}
              onChange={(e) => setFilterByDate(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            Filter berdasarkan tanggal
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border rounded px-3 py-2"
          >
            <option value="startTime">Urutkan: Waktu Mulai</option>
            <option value="borrowerName">Nama Peminjam</option>
            <option value="roomName">Nama Ruangan</option>
            <option value="status">Status</option>
          </select>
        </div>

        {filterByDate && (
          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : filteredBorrowings.length === 0 ? (
        <EmptyState
          title="Data tidak ditemukan"
          description="Coba ubah pencarian atau filter."
          buttonText="Reset"
          onClick={() => {
            setSearch("")
            setFilterByDate(false)
            setStartDate("")
            setEndDate("")
            setSortBy("startTime")
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredBorrowings.map((b) => (
            <div
              key={b.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="grid md:grid-cols-2 gap-2">
                <p><b>Peminjam:</b> {b.borrowerName}</p>
                <p><b>Ruangan:</b> {b.room.name}</p>
                <p><b>Tujuan:</b> {b.tujuan}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span className="font-semibold">
                    {statusMap[b.status]}
                  </span>
                </p>
              </div>

              <p className="mt-2 text-sm text-gray-600">
                {new Date(b.startTime).toLocaleString()} –{" "}
                {new Date(b.endTime).toLocaleString()}
              </p>

              <div className="mt-3">
                <button
                  onClick={() => navigate(`/borrowings/${b.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Detail →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
