import type { FavoriteStore } from "../types/Favorite";

export const dummyFavorites: FavoriteStore[] = [
  {
    store_id: 1,
    store_name: "더 맥주 광화문점",
    main_img:
      "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=400&q=80",
    address: "서울시 종로구 세종대로",
    type: "펍/호프",
  },
  {
    store_id: 2,
    store_name: "풋볼펍 홍대",
    main_img:
      "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&w=400&q=80",
    address: "서울시 마포구 양화로",
    type: "스포츠 바",
  },
];
