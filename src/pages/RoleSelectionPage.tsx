import { useNavigate } from "react-router-dom";

export default function RoleSelectionPage() {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-80 text-center">
                <h1 className="text-xl font-bold mb-6">
                    Pilih Role
                </h1>

                <button
                    onClick={() => navigate("/pengaju")}
                    className="w-full bg-blue-500 text-white py-2 rounded mb-3 hover:bg-blue-600"
                >
                    Login sebagai Pengaju
                </button>

                <button
                    onClick={() => navigate("/pengelola")}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Login sebagai Pengelola
                </button>
            </div>
        </div>
    );
}
