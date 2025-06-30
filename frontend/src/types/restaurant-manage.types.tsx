import BroadcastEdit from "../components/Mypage/RestaurantManage/Broadcasts/BroadcastEdit";
import BroadcastRegister from "../components/Mypage/RestaurantManage/Broadcasts/BroadcastRegister";
import BroadcastView from "../components/Mypage/RestaurantManage/Broadcasts/BroadcastView";
import RestaurantEdit from "../components/Mypage/RestaurantManage/RestaurantEdit";
import RestaurantHome from "../components/Mypage/RestaurantManage/RestaurantHome";
import RestaurantList from "../components/Mypage/RestaurantManage/RestaurantList";
import RestaurantRegister from "../components/Mypage/RestaurantManage/RestaurantRegister";

export const menuItems = [
  {
    key: "restaurant-home",
    label: "식당 관리",
    component: () => <RestaurantHome />,
  },
  {
    key: "restaurant-register",
    label: "식당 등록하기",
    component: () => <RestaurantRegister />,
  },
  {
    key: "restaurant-list",
    label: "내 식당 목록",
    component: () => <RestaurantList />,
  },
  {
    key: "restaurant-edit",
    label: "식당 수정하기",
    component: () => <RestaurantEdit />,
  },
  {
    key: "schedule-register",
    label: "중계 일정 등록",
    component: () => <BroadcastRegister />,
  },
  {
    key: "schedule-view",
    label: "중계 일정 관리",
    component: () => <BroadcastView />,
  },
  {
    key: "schedule-edit",
    label: "중계 일정 수정",
    component: () => <BroadcastEdit />,
  },
] as const;

export type MenuKey = (typeof menuItems)[number]["key"];
