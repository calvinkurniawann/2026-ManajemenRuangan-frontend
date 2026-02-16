import { useEffect, useState } from "react";
import { fetchData, putData } from "../api/api";
import type { Booking } from "../types/booking";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const loadBookings = () => {
        fetchData("RoomBookings?status=0")
            .then(setBookings)
            .catch(console.error);
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const changeStatus = async (id: number, status: number) => {
        try {
            await putData(`RoomBookings/${id}/status`, status);
            loadBookings();
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0:
                return (
                    <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                        Pending
                    </span>
                );
            case 1:
                return (
                    <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                        Approved
                    </span>
                );
            case 2:
                return (
                    <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                        Rejected
                    </span>
                );
            default:
                return "Unknown";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full px-10 bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Daftar Peminjaman
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="px-4 py-3 text-left">Ruangan</th>
                                <th className="px-4 py-3 text-left">Nama Peminjam</th>
                                <th className="px-4 py-3 text-left">Tanggal</th>
                                <th className="px-4 py-3 text-left">Tujuan</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{b.roomName}</td>
                                    <td className="px-4 py-3">{b.borrowerName}</td>
                                    <td className="px-4 py-3">
                                        {new Date(b.date).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">{b.purpose}</td>
                                    <td className="px-4 py-3">
                                        {getStatusLabel(b.status)}
                                    </td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => changeStatus(b.id, 1)}
                                            className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => changeStatus(b.id, 2)}
                                            className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {bookings.length === 0 && (
                        <div className="text-center text-gray-500 py-6">
                            Belum ada data peminjaman.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
