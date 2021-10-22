import { createContext } from "react";
import { IShopServiceInterface } from "../interfaces";

export const ShopDataAdapterContext =
  createContext<IShopServiceInterface | null>(null);
