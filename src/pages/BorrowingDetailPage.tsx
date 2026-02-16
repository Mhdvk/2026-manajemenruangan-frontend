import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBorrowing, getBorrowingById } from "../api/borrowingApi";
import statusMap from "../constant/borrowingStatus";
import type { Borrowing } from "../types/borrowing";

export default function BorrowingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [borrowing, setBorrowing] = useState<Borrowing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getBorrowingById(Number(id))
      .then(setBorrowing)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus peminjaman?",
    );
    if (!confirmDelete) return;

    await deleteBorrowing(Number(id));
    alert("Peminjaman berhasil dihapus");
    navigate("/");
  }

  if (loading) return <p>Loading...</p>;
  if (!borrowing) return <p>Data tidak ditemukan</p>;

return (
  <div className="min-h-screen bg-slate-100 px-4 py-10">
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl bg-white shadow-md">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Detail Peminjaman
            </h1>
            <p className="text-sm text-slate-500">
              Informasi lengkap peminjaman ruangan
            </p>
          </div>

          <button
            onClick={() => navigate("/borrowings")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Kembali
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Peminjam
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {borrowing.borrowerName}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Ruangan
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {borrowing.room.name}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Tujuan
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {borrowing.tujuan}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Status
              </p>
              <span className="mt-1 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {statusMap[borrowing.status] ?? "Unknown"}
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Waktu
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {new Date(borrowing.startTime).toLocaleString()}
                <br />
                <span className="text-slate-400">–</span>{" "}
                {new Date(borrowing.endTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
          <button
            onClick={() => navigate(`/borrowings/${id}/edit`)}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-300 hover:bg-slate-100"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
);
}