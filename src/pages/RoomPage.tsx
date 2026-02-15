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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-sm">Loading data ruangan...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Daftar Ruangan
      </h1>

      {rooms.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          Tidak ada ruangan tersedia
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Nama Ruangan</th>
                <th className="px-6 py-3">Lokasi</th>
                <th className="px-6 py-3">Kapasitas</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rooms.map((room) => (
                <tr
                  key={room.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {room.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {room.location}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {room.capacity ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
