import { backendApiClient } from "../../externalClients/axios";
import { Collection, Product } from "../../interfaces";
import { IShopServiceInterface } from "../../interfaces/IShopServiceInterface";
import shopData from "./shop.data";

class ShopService implements IShopServiceInterface {
  async getSingleCollection(categoryId: string): Promise<Collection> {
    const response = await backendApiClient.get(
      `/products/categories/${categoryId}`
    );
    const { data } = response.data;

    return data as Collection;
  }
  async getProductsInCollection(collectionId) {
    const response = await backendApiClient.get(
      `/products?category_id=${collectionId}`
    );
    const { data } = response.data;

    return data as Product[];
  }

  async getCollections(): Promise<Collection[]> {
    const response = await backendApiClient.get("/products/categories");
    const { data } = response.data;

    return data as Collection[];
  }
}

const shopModel = new ShopService();

export default shopModel;
