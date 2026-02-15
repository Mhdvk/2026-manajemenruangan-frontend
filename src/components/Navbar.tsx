import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">Sistem Manajemen Peminjaman Ruangan </span>
      </div>

      <div className="navbar-right">
        <NavLink to="/" end className="nav-link">
          Beranda
        </NavLink>

        <NavLink to="/borrowings/room" end className="nav-link">
          Ruangan
        </NavLink>

        <NavLink to="/borrowings" end className="nav-link">
          Riwayat Peminjaman
        </NavLink>

        <NavLink to="/borrowings/create" className="nav-link button">
          + Ajukan Peminjaman
        </NavLink>
      </div>
    </nav>
  );
}
