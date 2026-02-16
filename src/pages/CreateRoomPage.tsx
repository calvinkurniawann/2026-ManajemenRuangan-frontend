import { useEffect, useState } from "react";
import { fetchData, postData, deleteData } from "../api/api";
import type { Room } from "../types/room";

export default function CreateRoomPage() {
    const [form, setForm] = useState({
        name: "",
        location: "",
    });

    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<"success" | "error" | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);

    const loadRooms = () => {
        fetchData("Rooms")
            .then(setRooms)
            .catch(console.error);
    }
    useEffect(() => {
        loadRooms();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await postData("Rooms", form);

            setType("success");
            setMessage("Room berhasil ditambahkan!");

            setForm({
                name: "",
                location: "",
            });
            loadRooms();
        } catch (error: any) {
            setType("error");
            setMessage(error.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus booking?")) return;

        await deleteData(`rooms/${id}`);
        loadRooms();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full px-10 bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Tambah Ruangan</h2>

                {message && (
                    <div
                        className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium 
                    ${type === "success"
                                ? "bg-green-100 text-green-800 border border-green-300"
                                : "bg-red-100 text-red-800 border border-red-300"}`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nama Ruangan
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Lokasi
                        </label>
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) =>
                                setForm({ ...form, location: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Simpan
                    </button>
                </form>
            </div>
            <div className="w-full px-10 bg-white shadow-xl rounded-2xl p-6 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Daftar Ruangan
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                                <th className="px-6 py-3 text-left">Nama</th>
                                <th className="px-6 py-3 text-left">Lokasi</th>
                                <th className="px-4 py-3 text-left">Aksi</th>
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
                                    <td className="px-4 py-3 text-left space-x-2">
                                        <button
                                            onClick={() => handleDelete(room.id)}
                                            className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
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
