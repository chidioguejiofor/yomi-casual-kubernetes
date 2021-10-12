import { backendApiClient } from "../../externalClients/axios";
import { Collection } from "../../interfaces";
import { IShopServiceInterface } from "../../interfaces/IShopServiceInterface";
import shopData from "./shop.data";

class ShopService implements IShopServiceInterface {
  getProductsInCollection(collectionId) {
    return shopData[collectionId];
  }

  async getCollections(): Promise<Collection> {
    const response = await backendApiClient.get("/products/categories");
    const { data } = response.data;

    return data as Collection;
    return Object.values(shopData).sort(
      (a, b) => a.id - b.id
    ) as unknown as Collection;
  }
}

const shopModel = new ShopService();

export default shopModel;
