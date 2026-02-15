import { useEffect, useState } from "react";
import { getAllRooms } from "../api/roomApi";
import type { Room } from "../types/room";

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRooms()
      .then(setRooms)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading data ruangan...</p>;

  return (
    <div className="page">
      <h1>Daftar Ruangan</h1>

      {rooms.length === 0 && <p>Tidak ada ruangan tersedia</p>}

      <table border={1} cellPadding={8} style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>Nama Ruangan</th>
            <th>Lokasi</th>
            <th>Kapasitas</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.location}</td>
              <td>{room.capacity ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
