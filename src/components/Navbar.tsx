import { NavLink } from "react-router-dom";

export default function Navbar() {
  const baseLink =
    "px-3 py-2 rounded-md text-sm font-medium transition";
  const inactive =
    "text-gray-600 hover:text-blue-600 hover:bg-blue-50";
  const active =
    "text-blue-600 bg-blue-100";

  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <span className="text-lg font-semibold text-gray-800">
          Sistem Manajemen Peminjaman Ruangan
        </span>

        {/* Menu */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Beranda
          </NavLink>

          <NavLink
            to="/borrowings/room"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Ruangan
          </NavLink>

          <NavLink
            to="/borrowings"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Riwayat Peminjaman
          </NavLink>

          <NavLink
            to="/borrowings/create"
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            + Ajukan Peminjaman
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
