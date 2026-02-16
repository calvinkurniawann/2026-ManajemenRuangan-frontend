import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import PengajuPage from "./pages/PengajuPage";
import PengelolaPage from "./pages/PengelolaPage";
import RoomsPage from "./pages/RoomsPage";
import CreateBookingForm from "./pages/CreateBookingForm";
import BookingsPage from "./pages/BookingsPage";
import PengajuBookingsPage from "./pages/PengajuBookingsPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelectionPage />} />

      <Route path="/pengaju" element={<PengajuPage />}>
        <Route index element={<Navigate to="rooms" replace />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="create" element={<CreateBookingForm />} />
        <Route path="bookings" element={<PengajuBookingsPage />} />
      </Route>

      <Route path="/pengelola" element={<PengelolaPage />}>
        <Route index element={<Navigate to="bookings" replace />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="createroom" element={<CreateRoomPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

    </Routes>
  );
}

export default App;
