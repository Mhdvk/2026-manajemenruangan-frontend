import { useEffect, useState } from "react"
import {
  approveBorrowing,
  rejectBorrowing,
  getAllBorrowings
} from "../api/borrowingApi"
import type { Borrowing } from "../types/borrowing"
import statusMap from "../constant/borrowingStatus"

type NotificationType = "success" | "error"

export default function BorrowingApprovalPage() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([])
  const [loading, setLoading] = useState(true)

  const [notif, setNotif] = useState<{
    message: string
    type: NotificationType
  } | null>(null)

  useEffect(() => {
    refreshData()
  }, [])

  function showNotif(message: string, type: NotificationType) {
    setNotif({ message, type })
    setTimeout(() => setNotif(null), 3000)
  }

  async function handleApprove(id: number) {
    await approveBorrowing(id)
    showNotif("Peminjaman berhasil disetujui", "success")
    refreshData()
  }

  async function handleReject(id: number) {
    await rejectBorrowing(id)
    showNotif("Peminjaman berhasil ditolak", "error")
    refreshData()
  }

  function refreshData() {
    setLoading(true)
    getAllBorrowings()
      .then(setBorrowings)
      .finally(() => setLoading(false))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading data...
      </div>
    )
  }

  const pendingBorrowings = borrowings.filter(b => b.status === 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {notif && (
        <div
          className={`mb-4 px-4 py-3 rounded border text-sm ${
            notif.type === "success"
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
        >
          {notif.message}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">
        Approval Peminjaman Ruangan
      </h1>

      {pendingBorrowings.length === 0 ? (
        <div className="text-center text-gray-500 bg-gray-50 p-6 rounded-lg border">
          Tidak ada peminjaman yang menunggu persetujuan
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="px-4 py-3 border-b">Peminjam</th>
                <th className="px-4 py-3 border-b">Ruangan</th>
                <th className="px-4 py-3 border-b">Tujuan</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {pendingBorrowings.map(b => (
                <tr
                  key={b.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 border-b">
                    {b.borrowerName}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {b.room.name}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {b.tujuan}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {statusMap[b.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleApprove(b.id)}
                        className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        Setujui
                      </button>

                      <button
                        onClick={() => handleReject(b.id)}
                        className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  )
}
