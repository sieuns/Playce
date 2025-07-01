import { useState } from "react";
import ModalBase from "../Common/ModalBase";
import Sidebar from "../Mypage/Sidebar";
import FavoriteList from "./FavoriteList";
import UserInfo from "./UserInfo";
import RestaurantManager from "./RestaurantManage/RestaurantManager";

type TabType = "favorite" | "profile" | "restaurant";

export interface MypageProps {
  onClose: () => void;
}

const MypageModal = ({ onClose }: MypageProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("favorite");

  return (
    <ModalBase
      onClose={onClose}
      hideHeader
      className="min-h-[700px] min-w-[900px]"
    >
      <div className="flex min-h-[700px] bg-white rounded-xl overflow-hidden">
        {/* 왼쪽 사이드바 */}
        <Sidebar selected={selectedTab} onSelect={setSelectedTab} />

        {/* 오른쪽 콘텐츠 영역 */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
          {/* 콘텐츠 */}
          {selectedTab === "favorite" && <FavoriteList onClose={onClose} />}
          {selectedTab === "profile" && <UserInfo onClose={onClose} />}
          {selectedTab === "restaurant" && (
            <RestaurantManager onClose={onClose} />
          )}
        </div>
      </div>
    </ModalBase>
  );
};

export default MypageModal;
