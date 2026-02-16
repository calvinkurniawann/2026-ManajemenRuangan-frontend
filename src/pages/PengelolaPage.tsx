import BookingsPage from "./BookingsPage";
import { Link, Outlet } from "react-router-dom";

export default function PengelolaPage() {
    return (
        <div className="w-full p-6">

            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">Dashboard Pengelola</h1>

                <nav className="flex gap-4 mb-6">
                    <Link to="bookings" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Kelola Booking
                    </Link>

                    <Link to="createroom" className="bg-green-500 text-white px-4 py-2 rounded">
                        Kelola Ruangan
                    </Link>

                    <Link to="history" className="bg-gray-700 text-white px-4 py-2 rounded">
                        History
                    </Link>
                </nav>
                <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded mb-6">
                    Logout
                </Link>
            </div>
            <Outlet />
        </div>
    );
}
