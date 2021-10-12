import { createContext, useContext, useState, useEffect } from "react";
import { IShopServiceInterface, Collection } from "../interfaces";


export const ShopDataAdapterContext =
  createContext<IShopServiceInterface | null>(null);
