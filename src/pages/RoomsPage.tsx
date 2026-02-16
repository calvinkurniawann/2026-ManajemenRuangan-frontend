import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import type { Room } from "../types/room";

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        fetchData("Rooms")
            .then(setRooms)
            .catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="w-full bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Daftar Ruangan
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                                <th className="px-6 py-3 text-left">Nama</th>
                                <th className="px-6 py-3 text-left">Lokasi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {rooms.map((room) => (
                                <tr key={room.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {room.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {room.location}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {rooms.length === 0 && (
                        <div className="text-center text-gray-500 py-6">
                            Belum ada data ruangan.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
