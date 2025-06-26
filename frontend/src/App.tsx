import { useState } from "react";
import MypageModal from "./components/Mypage/MypageModal";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";

function App() {
  const [isMypageOpen, setIsMypageOpen] = useState(false);
  return (
    <main className="min-h-screen bg-gray-50 font-sans relative">
      {/* 마이페이지 버튼 */}
      <button
        onClick={() => setIsMypageOpen(true)}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md z-50"
      >
        마이페이지
      </button>

      {/* 메인 레이아웃 */}
      <div className="flex">
        {/* 왼쪽: SearchPage */}
        <aside className="w-[250px] bg-white border-r min-h-screen">
          <SearchPage />
        </aside>

        {/* 가운데: Home */}
        <section className="flex-1 p-6">
          <Home />
        </section>
      </div>

      {/* 마이페이지 모달 */}
      {isMypageOpen && <MypageModal onClose={() => setIsMypageOpen(false)} />}
    </main>
  );
}

export default App;
