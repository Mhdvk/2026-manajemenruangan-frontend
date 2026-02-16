import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4">
    <div className="mx-auto flex min-h-screen max-w-6xl items-center">
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <span className="mb-3 inline-block w-fit rounded-full bg-blue-100 px-4 py-1 text-xs font-medium text-blue-700">
            Sistem Informasi
          </span>

          <h1 className="text-4xl font-bold leading-tight text-slate-800">
            Manajemen <br />
            Peminjaman Ruangan
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
            Aplikasi internal untuk mengelola peminjaman ruangan secara rapi,
            terjadwal, dan terdokumentasi dengan baik.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/borrowings/create")}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700"
            >
              Tambah Peminjaman
            </button>

            <button
              onClick={() => navigate("/borrowings")}
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow hover:bg-slate-100"
            >
              Riwayat Peminjaman
            </button>
          </div>

          <p className="mt-10 text-xs text-slate-500">
            Dikembangkan oleh{" "}
            <span className="font-medium text-slate-700">
              Muhammad Mahdavikia Abdillah
            </span>
          </p>
        </div>

        <div className="relative hidden md:flex items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-60" />
          <div className="absolute h-52 w-52 translate-x-16 translate-y-10 rounded-full bg-indigo-200 blur-3xl opacity-60" />

          <div className="relative rounded-2xl bg-white p-6 shadow-xl">
            <div className="space-y-4">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-3 w-56 rounded bg-slate-200" />
              <div className="h-3 w-52 rounded bg-slate-200" />
              <div className="mt-6 h-8 w-32 rounded bg-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
