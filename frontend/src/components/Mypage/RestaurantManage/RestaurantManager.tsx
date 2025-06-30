import { FaArrowLeft, FaTimes } from "react-icons/fa";
import useMypageStore from "../../../stores/mypageStore";
import {
  menuItems,
  type MenuKey,
} from "../../../types/restaurant-manage.types";
import type { MypageProps } from "../MypageModal";

const RestaurantManager = ({ onClose }: MypageProps) => {
  const { restaurantSubpage, setRestaurantSubpage } = useMypageStore();

  return (
    <div className="px-2">
      <div className="flex items-center justify-between text-lg font-semibold my-5">
        <div className="flex items-center gap-2">
          {restaurantSubpage !== "restaurant-home" && (
            <FaArrowLeft
              className="hover:cursor-pointer hover:text-primary5"
              onClick={() => {
                if (restaurantSubpage === "schedule-view-broadcasts") {
                  setRestaurantSubpage("schedule-view-restaurants");
                } else {
                  setRestaurantSubpage("restaurant-home");
                }
              }}
            />
          )}
          {getModalTitle(restaurantSubpage)}
        </div>
        <button onClick={onClose} className="hover:text-primary5">
          <FaTimes />
        </button>
      </div>

      <div>{getComponents(restaurantSubpage)}</div>
    </div>
  );
};

const getModalTitle = (key: MenuKey) => {
  const item = menuItems.find((i) => i.key === key);
  return item?.label ?? "";
};

const getComponents = (key: MenuKey) => {
  const item = menuItems.find((i) => i.key === key);
  return item?.component();
};

export default RestaurantManager;
