import MypageModal from "./components/Mypage/MypageModal";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import useMypageStore from "./stores/mypageStore";

function App() {
  const { isMypageOpen, setIsMypageOpen } = useMypageStore();
  return (
    <main className="min-h-screen bg-gray-50 font-sans relative">
      {/* 메인 레이아웃 */}
      <div className="flex">
        {/* 왼쪽: SearchPage */}
        <aside className="bg-white border-r min-h-screen">
          <SearchPage />
        </aside>

        {/* 가운데: Home */}
        <section className="flex-1">
          <Home />
        </section>
      </div>

      {/* 마이페이지 모달 */}
      {isMypageOpen && <MypageModal onClose={() => setIsMypageOpen(false)} />}
    </main>
  );
}

export default App;
