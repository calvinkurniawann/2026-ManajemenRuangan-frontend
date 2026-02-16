import { useEffect, useState } from "react";
import { fetchData, putData, deleteData } from "../api/api";
import type { Booking } from "../types/booking";
import type { Room } from "../types/room";

export default function PengajuBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<"success" | "error" | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [editForm, setEditForm] = useState({
        roomId: 0,
        borrowerName: "",
        date: "",
        purpose: "",
    });


    const loadData = () => {
        fetchData("RoomBookings")
            .then(setBookings)
            .catch(console.error);

        fetchData("Rooms")
            .then(setRooms)
            .catch(console.error);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus booking?")) return;

        await deleteData(`RoomBookings/${id}`);
        loadData();
    };

    const handleEdit = (booking: Booking) => {
        if (!booking) return;

        if (booking.status !== 0) {
            alert("Booking hanya bisa diedit jika status Pending");
            return;
        }

        setSelectedBooking(booking);

        setEditForm({
            roomId: booking.room?.id ?? 0,
            borrowerName: booking.borrowerName,
            date: booking.date.slice(0, 16),
            purpose: booking.purpose,
        });
    };

    const handleSaveEdit = async () => {
        if (!selectedBooking) return;

        try {
            await putData(`RoomBookings/${selectedBooking.id}`, editForm);

            setType("success");
            setMessage("Booking berhasil diedit!");

            setSelectedBooking(null);
            loadData();

        } catch (error: any) {
            setType("error");
            setMessage(error.message);
        }

    };



    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0: return "Pending";
            case 1: return "Approved";
            case 2: return "Rejected";
            default: return "Unknown";
        }
    };

    return (
        <div className="w-full px-10 bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Booking
            </h2>

            {message && (
                <div
                    className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium 
            ${type === "success"
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                >
                    {message}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                            <th className="px-4 py-3 text-left">Ruangan</th>
                            <th className="px-4 py-3 text-left">Tanggal</th>
                            <th className="px-4 py-3 text-left">Tujuan</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3">{b.roomName}</td>
                                <td className="px-4 py-3">
                                    {new Date(b.date).toLocaleString()}
                                </td>
                                <td className="px-4 py-3">{b.purpose}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full
                                ${b.status === 0
                                                ? "bg-yellow-100 text-yellow-700"
                                                : b.status === 1
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {getStatusLabel(b.status)}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(b)}
                                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(b.id)}
                                        className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {bookings.length === 0 && (
                    <div className="text-center text-gray-500 py-6">
                        Belum ada data booking.
                    </div>
                )}
            </div>

            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Edit Booking</h3>

                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">
                                Ruangan
                            </label>
                            <select
                                value={editForm.roomId}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        roomId: Number(e.target.value)
                                    })
                                }
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value={0}>Pilih Ruangan</option>
                                {rooms.map((r) => (
                                    <option key={r.id} value={r.id}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">
                                Nama Peminjam
                            </label>
                            <input
                                type="text"
                                value={editForm.borrowerName}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        borrowerName: e.target.value
                                    })
                                }
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">
                                Tanggal
                            </label>
                            <input
                                type="datetime-local"
                                value={editForm.date}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        date: e.target.value
                                    })
                                }
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">
                                Tujuan
                            </label>
                            <input
                                type="text"
                                value={editForm.purpose}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        purpose: e.target.value
                                    })
                                }
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


}
