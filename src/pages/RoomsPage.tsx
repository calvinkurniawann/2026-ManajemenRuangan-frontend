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
        <div>
            <h2>Daftar Ruangan</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Lokasi</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <td>{room.name}</td>
                            <td>{room.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
