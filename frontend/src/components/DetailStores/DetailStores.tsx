import { useState } from "react";
import {
  FiStar,
  FiShare2,
  FiMapPin,
  FiClock,
  FiPhone,
  FiFileText,
  FiChevronLeft,
  FiTv,
} from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import { dummyRestaurantDetail } from "../../data/dummyRestaurantDetail"; // 변경된 import

const TABS = ["홈", "메뉴", "중계"] as const;
type Tab = (typeof TABS)[number];

interface RestaurantDetailComponentProps {
  onClose: () => void;
}

export default function RestaurantDetailComponent({
  onClose,
}: RestaurantDetailComponentProps) {
  const [currentTab, setCurrentTab] = useState<Tab>("홈");

  return (
    <aside className="fixed left-0 top-0 h-full w-[370px] z-[100] bg-white shadow-2xl border-r border-gray-100 flex flex-col font-pretendard">
      {/* 닫기(뒤로가기) 버튼 */}
      <button
        onClick={onClose}
        className="fixed left-[350px] top-1/2 -translate-y-1/2 z-[120] w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-emerald-50 transition"
        aria-label="상세보기 닫기"
        style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)" }}
      >
        <FiChevronLeft className="text-emerald-500 text-2xl" />
      </button>

      {/* 이미지 */}
      <div className="w-full h-44 bg-gray-100 flex items-center justify-center relative">
        {dummyRestaurantDetail.img_list[0] ? (
          <img
            src={dummyRestaurantDetail.img_list[0]}
            alt={dummyRestaurantDetail.store_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">이미지 없음</span>
        )}
        {/* 저장/공유 버튼 */}
        <div className="absolute left-4 top-4 flex gap-2 z-10">
          <button className="bg-white/80 rounded-full p-2 shadow hover:bg-emerald-100 transition">
            <FiStar className="text-emerald-500 text-lg" />
          </button>
          <button className="bg-white/80 rounded-full p-2 shadow hover:bg-emerald-100 transition">
            <FiShare2 className="text-emerald-500 text-lg" />
          </button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-1 transition-all
              ${
                currentTab === tab
                  ? "text-gray-900 border-b-2 border-gray-200 bg-white"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            onClick={() => setCurrentTab(tab)}
            style={{ background: "none" }}
          >
            {tab === "메뉴" && <FaUtensils className="text-base" />}
            {tab === "중계" && <FiTv className="text-base" />}
            {tab}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="flex-1 p-5 text-sm overflow-y-auto">
        {/* 홈 탭 */}
        {currentTab === "홈" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold mb-2">
              {dummyRestaurantDetail.store_name}
            </h2>
            <p className="mb-2 text-gray-700">
              {dummyRestaurantDetail.description}
            </p>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-xl" />
              <span>{dummyRestaurantDetail.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-xl" />
              <span>{dummyRestaurantDetail.opening_hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-xl" />
              <span>{dummyRestaurantDetail.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiFileText className="text-xl" />
              <span>{dummyRestaurantDetail.type}</span>
            </div>
          </div>
        )}

        {/* 메뉴 탭 */}
        {currentTab === "메뉴" && (
          <ul className="grid grid-cols-1 gap-3">
            {dummyRestaurantDetail.menus &&
            dummyRestaurantDetail.menus.length > 0 ? (
              dummyRestaurantDetail.menus.map((menu, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition group"
                >
                  <FaUtensils className="text-emerald-400 text-lg" />
                  <span className="font-medium text-gray-700 group-hover:text-emerald-700 transition">
                    {menu}
                  </span>
                </li>
              ))
            ) : (
              <li className="py-3 text-gray-400 text-center">메뉴 정보 없음</li>
            )}
          </ul>
        )}

        {/* 중계 탭 */}
        {currentTab === "중계" && (
          <ul className="flex flex-col gap-4">
            {dummyRestaurantDetail.broadcasts.length > 0 ? (
              dummyRestaurantDetail.broadcasts.map((b, idx) => (
                <li
                  key={idx}
                  className="rounded-xl bg-gradient-to-r from-emerald-50 to-white shadow p-4 flex flex-col gap-1 border border-emerald-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FiTv className="text-emerald-500" />
                    <span className="font-semibold">
                      {b.league} {b.sport}
                    </span>
                    <span className="ml-auto text-xs text-gray-400">
                      {b.match_date} {b.match_time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-base font-bold text-gray-800">
                    {b.team_one}
                    <span className="mx-1 text-emerald-400">vs</span>
                    {b.team_two}
                    {b.etc && (
                      <span className="ml-2 text-xs text-emerald-600 bg-emerald-100 rounded px-2 py-0.5">
                        {b.etc}
                      </span>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="py-6 text-gray-400 text-center">
                예정된 중계가 없습니다.
              </li>
            )}
          </ul>
        )}
      </div>
    </aside>
  );
}
