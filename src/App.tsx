import { useState } from "react";
import PengajuPage from "./pages/PengajuPage";
import PengelolaPage from "./pages/PengelolaPage";

function App() {
  const [role, setRole] = useState<"pengaju" | "pengelola" | null>(null);

  if (!role) {
    return (
      <div>
        <h1>Pilih Role</h1>
        <button onClick={() => setRole("pengaju")}>Login sebagai Pengaju</button>
        <button onClick={() => setRole("pengelola")}>Login sebagai Pengelola</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setRole(null)}>Logout</button>
      {role === "pengaju" ? <PengajuPage /> : <PengelolaPage />}
    </div>
  );
}

export default App;
