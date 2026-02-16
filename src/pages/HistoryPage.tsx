import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import type { Booking } from "../types/booking";

export default function HistoryPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [room, setRoom] = useState("");
    const [borrower, setBorrower] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const query = new URLSearchParams();

        if (room) query.append("room", room);
        if (borrower) query.append("borrower", borrower);
        if (status !== "") query.append("status", status);

        const data = await fetchData(`RoomBookings?${query.toString()}`);
        setBookings(data);
    }

    function getStatusBadge(status: number) {
        switch (status) {
            case 0:
                return (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                    </span>
                );
            case 1:
                return (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Approved
                    </span>
                );
            case 2:
                return (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                        Rejected
                    </span>
                );
            default:
                return "-";
        }
    }

    return (
        <div className="w-full px-10 bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                History Peminjaman
            </h2>

            {/* Filter Section */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    placeholder="Cari Ruangan"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />

                <input
                    placeholder="Nama Peminjam"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={borrower}
                    onChange={(e) => setBorrower(e.target.value)}
                />

                <select
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Semua Status</option>
                    <option value="0">Pending</option>
                    <option value="1">Approved</option>
                    <option value="2">Rejected</option>
                </select>

                <button
                    onClick={loadData}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                            <th className="px-4 py-3 text-left">Ruangan</th>
                            <th className="px-4 py-3 text-left">Peminjam</th>
                            <th className="px-4 py-3 text-left">Tanggal</th>
                            <th className="px-4 py-3 text-left">Tujuan</th>
                            <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3">{b.roomName}</td>
                                <td className="px-4 py-3">{b.borrowerName}</td>
                                <td className="px-4 py-3">
                                    {new Date(b.date).toLocaleString()}
                                </td>
                                <td className="px-4 py-3">{b.purpose}</td>
                                <td className="px-4 py-3">
                                    {getStatusBadge(b.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {bookings.length === 0 && (
                    <div className="text-center text-gray-500 py-6">
                        Tidak ada data ditemukan.
                    </div>
                )}
            </div>
        </div>
    );
}
