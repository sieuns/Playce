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
    <>
      <div className="flex items-center justify-between text-lg font-semibold mb-5">
        <div className="flex items-center gap-3">
          {restaurantSubpage !== "restaurant-home" && (
            <FaArrowLeft
              className="hover:cursor-pointer hover:text-primary5"
              onClick={() => setRestaurantSubpage("restaurant-home")}
            />
          )}
          {getModalTitle(restaurantSubpage)}
        </div>
        <button onClick={onClose} className="hover:text-primary5">
          <FaTimes />
        </button>
      </div>

      {getComponents(restaurantSubpage)}
    </>
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
