import { useState } from "react";
import {
  FiStar,
  FiShare2,
  FiMapPin,
  FiClock,
  FiPhone,
  FiFileText,
} from "react-icons/fi";
import type { RestaurantDetail } from "../../types/restaurant.types";

// 더미 데이터 (삭제 예정)
const dummyData: RestaurantDetail = {
  store_name: "리버풀펍 바(BAR)",
  address: "서울 중구 북창동",
  phone: "0507-1332-4885",
  opening_hours: "매일 18:00 ~ 03:00",
  menus: ["피자", "치킨", "볶음우동", "생맥주500ml"],
  type: "펍/호프",
  img_list: [
    "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&w=400&q=80",
  ],
  description: "다양한 맥주를 즐기는 시원한 공간",
  broadcasts: [
    {
      match_date: "2025-07-01",
      match_time: "21:00",
      sport: "축구",
      league: "EPL",
      team_one: "리버풀",
      team_two: "맨체스터 Utd",
      etc: "빅매치",
    },
    {
      match_date: "2025-07-02",
      match_time: "20:00",
      sport: "야구",
      league: "KBO",
      team_one: "두산",
      team_two: "LG",
      etc: "",
    },
  ],
};

// ==================

const TABS = ["홈", "메뉴", "중계"] as const;
type Tab = (typeof TABS)[number];

export default function RestaurantDetailComponent() {
  const [currentTab, setCurrentTab] = useState<Tab>("홈");

  return (
    <div className="fixed left-6 bottom-6 w-[350px] bg-white rounded-xl shadow-lg overflow-hidden z-50">
      {/* 이미지 */}
      <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
        {dummyData.img_list[0] ? (
          <img
            src={dummyData.img_list[0]}
            alt={dummyData.store_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">이미지 없음</span>
        )}
      </div>

      {/* 저장/공유 버튼 */}
      <div className="flex border-b border-gray-100 bg-white">
        <button className="w-1/2 flex flex-col items-center py-3 text-gray-600 hover:text-green-600 transition">
          <FiStar className="text-2xl mb-1" />
          <span className="text-xs">저장</span>
        </button>
        <button className="w-1/2 flex flex-col items-center py-3 text-gray-600 hover:text-green-600 transition">
          <FiShare2 className="text-2xl mb-1" />
          <span className="text-xs">공유</span>
        </button>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-sm font-semibold ${
              currentTab === tab
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="p-5 text-sm">
        {currentTab === "홈" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold mb-2">{dummyData.store_name}</h2>
            <p className="mb-2 text-gray-700">{dummyData.description}</p>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-xl" />
              <span>{dummyData.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-xl" />
              <span>{dummyData.opening_hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-xl" />
              <span>{dummyData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiFileText className="text-xl" />
              <span>{dummyData.type}</span> {/* 업종을 제일 밑으로 이동 */}
            </div>
          </div>
        )}
        {currentTab === "메뉴" && (
          <ul className="divide-y divide-gray-100">
            {dummyData.menus && dummyData.menus.length > 0 ? (
              dummyData.menus.map((menu, idx) => (
                <li key={idx} className="py-3 px-2 text-base text-gray-800">
                  {menu}
                </li>
              ))
            ) : (
              <li className="py-3 text-gray-400">메뉴 정보 없음</li>
            )}
          </ul>
        )}
        {currentTab === "중계" && (
          <ul>
            {dummyData.broadcasts.length > 0 ? (
              dummyData.broadcasts.map((b, idx) => (
                <li key={idx} className="mb-3 border-b pb-2">
                  <b>
                    {b.match_date} {b.match_time}
                  </b>{" "}
                  | {b.league} {b.sport}
                  <br />
                  {b.team_one} vs {b.team_two} {b.etc && `(${b.etc})`}
                </li>
              ))
            ) : (
              <li>예정된 중계가 없습니다.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
