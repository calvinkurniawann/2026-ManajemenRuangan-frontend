import { useEffect, useState } from "react";
import { fetchData, postData } from "../api/api";
import type { Room } from "../types/room";

export default function CreateBookingForm() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<"success" | "error" | null>(null);
    const [form, setForm] = useState({
        roomId: 0,
        borrowerName: "",
        date: "",
        purpose: "",
    });

    useEffect(() => {
        fetchData("Rooms").then(setRooms);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await postData("RoomBookings", form);

            setType("success");
            setMessage("Booking berhasil dibuat!");

            setForm({
                roomId: 0,
                borrowerName: "",
                date: "",
                purpose: "",
            });

        } catch (error: any) {
            setType("error");
            setMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full bg-white shadow-xl rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Buat Booking Ruangan
                </h3>

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


                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ruangan
                        </label>
                        <select
                            value={form.roomId}
                            onChange={(e) =>
                                setForm({ ...form, roomId: Number(e.target.value) })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="">Pilih Ruangan</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Peminjam
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan nama"
                            value={form.borrowerName}
                            onChange={(e) =>
                                setForm({ ...form, borrowerName: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tanggal & Waktu
                        </label>
                        <input
                            type="datetime-local"
                            value={form.date}
                            onChange={(e) =>
                                setForm({ ...form, date: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tujuan
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: Rapat Organisasi"
                            value={form.purpose}
                            onChange={(e) =>
                                setForm({ ...form, purpose: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Submit Booking
                    </button>
                </form>
            </div>
        </div>
    );
}
