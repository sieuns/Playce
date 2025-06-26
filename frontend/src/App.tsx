import { useState } from "react";
import MypageModal from "./components/Mypage/MypageModal";
import Home from "./pages/Home";

function App() {
  const [isMypageOpen, setIsMypageOpen] = useState(false);
  return (
    <main className="min-h-screen bg-gray-50 font-sans relative">
      <button
        onClick={() => setIsMypageOpen(true)}
        className="fixed top-20 right-6 px-4 py-2 bg-blue-500 text-white rounded-md z-50"
      >
        마이페이지
      </button>

      {/* ✅ SearchPage는 Home 안에서만 사용되므로 App에서는 Home만 렌더링 */}
      <Home />

      {isMypageOpen && <MypageModal onClose={() => setIsMypageOpen(false)} />}
    </main>
  );
}

export default App;
