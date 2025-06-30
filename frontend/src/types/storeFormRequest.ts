export interface StoreFormRequest {
  store_name: string;
  business_number: string;
  address: string;
  phone: string;
  opening_hours: string;
  menus: string[];
  type: string;
  description?: string; // 선택 입력
  img_urls?: string[]; // 선택 입력
}
