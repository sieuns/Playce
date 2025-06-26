export interface Broadcast {
  match_date: string;
  match_time: string;
  sport: string;
  league: string;
  team_one: string;
  team_two: string;
  etc: string;
}

export interface RestaurantDetail {
  store_name: string;
  address: string;
  phone: string;
  opening_hours: string;
  menus: string[];
  type: string;
  img_list: string[];
  description: string;
  broadcasts: Broadcast[];
}
