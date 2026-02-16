import { Link, Routes, Route, Navigate, Outlet } from "react-router-dom";
import RoomsPage from "./RoomsPage";
import CreateBookingForm from "./CreateBookingForm";

export default function PengajuPage() {
    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">Halaman Pengaju</h1>

                <nav className="flex gap-4 mb-6">
                    <Link to="rooms" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Ruangan
                    </Link>

                    <Link to="create" className="bg-green-500 text-white px-4 py-2 rounded">
                        Buat Booking
                    </Link>

                    <Link to="bookings" className="bg-gray-700 text-white px-4 py-2 rounded">
                        Booking
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
