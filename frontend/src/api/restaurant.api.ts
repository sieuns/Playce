import { requestHandler } from "./http";

export const getStoreDetail = (storeId: number) =>
  requestHandler("get", `/stores/${storeId}`);

export interface RegisterStoreProps {
  store_name: string;
  business_number: string;
  address: string;
  phone: string;
  opening_hours: string;
  menus: string;
  type: string;
  description: string;
  images: string[];
}

export const registerStore = (data: RegisterStoreProps) => {
  return requestHandler("post", "/stores", data);
};
