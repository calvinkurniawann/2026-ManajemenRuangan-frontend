import { useEffect, useState } from "react";
import { fetchData, postData } from "../api/api";
import type { Room } from "../types/room";

export default function CreateBookingForm() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [form, setForm] = useState({
        roomId: 0,
        borrowerName: "",
        date: "",
        purpose: "",
    });

    useEffect(() => {
        fetchData("Rooms").then(setRooms);
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await postData("RoomBookings", form);
        alert("Booking berhasil dibuat!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Buat Booking</h3>

            <select
                onChange={(e) =>
                    setForm({ ...form, roomId: Number(e.target.value) })
                }
            >
                <option value="">Pilih Ruangan</option>
                {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                        {room.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Nama"
                onChange={(e) =>
                    setForm({ ...form, borrowerName: e.target.value })
                }
            />

            <input
                type="datetime-local"
                onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                }
            />

            <input
                type="text"
                placeholder="Tujuan"
                onChange={(e) =>
                    setForm({ ...form, purpose: e.target.value })
                }
            />

            <button type="submit">Submit</button>
        </form>
    );
}
