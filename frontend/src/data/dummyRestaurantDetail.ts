import type { RestaurantDetail } from "../types/restaurant.types";

export const dummyRestaurantDetail: RestaurantDetail = {
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
