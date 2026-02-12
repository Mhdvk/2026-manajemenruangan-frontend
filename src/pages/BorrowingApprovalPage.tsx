import { useEffect, useState } from "react"
import {
  approveBorrowing,
  rejectBorrowing,
  getAllBorrowings
} from "../api/borrowingApi"
import type { Borrowing } from "../types/borrowing"
import statusMap from "../constant/borrowingStatus"

export default function BorrowingApprovalPage() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllBorrowings()
      .then(setBorrowings)
      .finally(() => setLoading(false))
  }, [])

  async function handleApprove(id: number) {
    await approveBorrowing(id)
    refreshData()
  }

  async function handleReject(id: number) {
    await rejectBorrowing(id)
    refreshData()
  }

  function refreshData() {
    setLoading(true)
    getAllBorrowings()
      .then(setBorrowings)
      .finally(() => setLoading(false))
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="page">
      <h1>Approval Peminjaman Ruangan</h1>

      <table>
        <thead>
          <tr>
            <th>Peminjam</th>
            <th>Ruangan</th>
            <th>Tujuan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {borrowings
            .filter(b => b.status === 0)
            .map(b => (
              <tr key={b.id}>
                <td>{b.borrowerName}</td>
                <td>{b.room.name}</td>
                <td>{b.tujuan}</td>
                <td>{statusMap[b.status]}</td>
                <td>
                  <button onClick={() => handleApprove(b.id)}>
                    Setujui
                  </button>
                  <button
                    onClick={() => handleReject(b.id)}
                    style={{ marginLeft: 8, color: "red" }}
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
