import { useState } from "react";
import {
  FiStar,
  FiShare2,
  FiMapPin,
  FiClock,
  FiPhone,
  FiFileText,
  FiX,
  FiTv,
} from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import type { RestaurantDetail } from "../../types/restaurant.types";

const TABS = ["홈", "메뉴", "중계"] as const;
type Tab = (typeof TABS)[number];

interface RestaurantDetailComponentProps {
  detail: RestaurantDetail;
  onClose: () => void;
}

export default function RestaurantDetailComponent({
  detail,
  onClose,
}: RestaurantDetailComponentProps) {
  const [currentTab, setCurrentTab] = useState<Tab>("홈");

  return (
    <aside className="fixed left-0 top-0 h-full w-[430px] z-[100] bg-white shadow-2xl border-r border-gray-100 flex flex-col font-pretendard">
      {/* 상단: 로고와 닫기(X) 버튼을 같은 flex row에 배치 */}
      <div className="relative h-12 border-b border-gray-100 bg-white">
        <span className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl font-bold tracking-tight text-emerald-600 font-pretendard">
          Playce
        </span>
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-50 transition"
          aria-label="상세보기 닫기"
        >
          <FiX className="text-emerald-500 text-2xl" />
        </button>
      </div>

      {/* 이미지 */}
      <div className="w-full h-56 bg-gradient-to-tr from-emerald-50 via-white to-orange-50 flex items-center justify-center relative">
        {detail.img_list[0] ? (
          <img
            src={detail.img_list[0]}
            alt={detail.store_name}
            className="w-full h-full object-cover rounded-b-xl"
          />
        ) : (
          <span className="text-gray-400">이미지 없음</span>
        )}
        {/* 저장/공유 버튼 */}
        <div className="absolute left-6 top-6 flex gap-3 z-10">
          <button className="bg-white/90 rounded-full p-2 shadow hover:bg-orange-50 transition">
            <FiStar className="text-emerald-500 text-lg" />
          </button>
          <button className="bg-white/90 rounded-full p-2 shadow hover:bg-orange-50 transition">
            <FiShare2 className="text-emerald-500 text-lg" />
          </button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-base font-semibold flex items-center justify-center gap-1 transition-all
              ${
                currentTab === tab
                  ? "text-emerald-600 border-b-2 border-emerald-400 bg-white"
                  : "text-gray-400 hover:text-emerald-600"
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
      <div className="flex-1 p-6 text-base overflow-y-auto">
        {/* 홈 탭 */}
        {currentTab === "홈" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2">{detail.store_name}</h2>
            <p className="mb-2 text-gray-700">{detail.description}</p>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-xl" />
              <span>{detail.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-xl" />
              <span>{detail.opening_hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-xl" />
              <span>{detail.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiFileText className="text-xl" />
              <span>{detail.type}</span>
            </div>
          </div>
        )}

        {/* 메뉴 탭 */}
        {currentTab === "메뉴" && (
          <ul className="grid grid-cols-1 gap-3">
            {detail.menus && detail.menus.length > 0 ? (
              detail.menus.map((menu, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition group"
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
            {detail.broadcasts.length > 0 ? (
              detail.broadcasts.map((b, idx) => (
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
