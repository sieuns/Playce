import { requestHandler } from "./http";

export const getStoreDetail = (storeId: number) =>
  requestHandler("get", `/stores/${storeId}`);
