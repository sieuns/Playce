import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import SlideModal from "./SlideModal";
import SlideDetailModal from "./SlideDetailModal";

const menuItems = [
  { key: "restaurantregister", label: "식당 등록하기" },
  { key: "restaurantlist", label: "내 식당 목록" },
  { key: "restaurantedit", label: "식당 수정하기" },
  { key: "schedule-add", label: "중계 일정 등록" },
  { key: "schedule-view", label: "중계 일정 확인" },
  { key: "schedule-edit", label: "중계 일정 수정" },
] as const;

type MenuKey = (typeof menuItems)[number]["key"];

const RestaurantManager = () => {
  const [activeSubModal, setActiveSubModal] = useState<MenuKey | null>(null);

  return (
    <div className="space-y-2 mt-6">
      <h2 className="px-2 text-lg font-semibold text-gray-800">식당 관리</h2>
      <div className="flex flex-col divide-y divide-gray-300">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSubModal(item.key)}
            className="flex items-center justify-between px-4 py-2.5 text-left w-full hover:bg-primary4 transition-colors"
          >
            <span>{item.label}</span>
            <FaChevronRight className="text-gray-400 text-sm" />
          </button>
        ))}
      </div>

      {/* ✅ 슬라이드되는 서브 모달 */}
      {activeSubModal && (
        <SlideModal
          title={getModalTitle(activeSubModal)}
          onClose={() => setActiveSubModal(null)}
          onBack={() => setActiveSubModal(null)} // 지금은 뒤로가기 = 닫기
        >
          <SlideDetailModal>
            <p className="text-sm text-gray-600">
              {activeSubModal} 상세 페이지입니다.
            </p>
          </SlideDetailModal>
        </SlideModal>
      )}
    </div>
  );
};

const getModalTitle = (key: MenuKey) => {
  const item = menuItems.find((i) => i.key === key);
  return item?.label ?? "";
};

export default RestaurantManager;
