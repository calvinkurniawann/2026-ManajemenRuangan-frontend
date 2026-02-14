import { useEffect, useState } from "react";
import { fetchData, updateData } from "../api/api";
import type { Booking } from "../types/booking";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const loadBookings = () => {
        fetchData("RoomBookings")
            .then(setBookings)
            .catch(console.error);
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const changeStatus = async (id: number, status: number) => {
        try {
            await updateData(`RoomBookings/${id}/status`, status);
            loadBookings();
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0:
                return <span style={{ color: "orange" }}>Pending</span>;
            case 1:
                return <span style={{ color: "green" }}>Approved</span>;
            case 2:
                return <span style={{ color: "red" }}>Rejected</span>;
            default:
                return "Unknown";
        }
    };


    return (
        <div>
            <h2>Daftar Peminjaman</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Ruangan</th>
                        <th>Nama Peminjam</th>
                        <th>Tanggal</th>
                        <th>Tujuan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b.id}>
                            <td>{b.roomName}</td>
                            <td>{b.borrowerName}</td>
                            <td>{new Date(b.date).toLocaleString()}</td>
                            <td>{b.purpose}</td>
                            <td>{getStatusLabel(b.status)}</td>
                            <td>
                                <button onClick={() => changeStatus(b.id, 1)}>
                                    Approve
                                </button>
                                <button onClick={() => changeStatus(b.id, 2)}>
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
