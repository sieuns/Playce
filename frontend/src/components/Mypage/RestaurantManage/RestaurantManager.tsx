import { FaArrowLeft } from "react-icons/fa";
import useMypageStore from "../../../stores/mypageStore";
import {
  menuItems,
  type MenuKey,
} from "../../../types/restaurante-manage.types";

const RestaurantManager = () => {
  const { restaurantSubpage, setRestaurantSubpage } = useMypageStore();

  return (
    <div className="space-y-2 mt-6">
      <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
        {restaurantSubpage !== "restaurant-home" && (
          <FaArrowLeft
            className="hover:cursor-pointer"
            onClick={() => setRestaurantSubpage("restaurant-home")}
          />
        )}
        {getModalTitle(restaurantSubpage)}
      </div>
      {getComponents(restaurantSubpage)}
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
