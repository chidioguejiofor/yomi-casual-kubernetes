import { backendApiClient } from "../../externalClients/axios";
import { Collection, Product } from "../../interfaces";
import { IShopServiceInterface } from "../../interfaces/IShopServiceInterface";
import axios from "axios";

class ShopService implements IShopServiceInterface {
  async createProduct(
    formData: FormData,
    categoryId: string
  ): Promise<Product | null> {
    console.log("createProductRequest==:", formData);

    const response = await backendApiClient.post(`/products/`, {
      categoryId,
      name: formData.get("name"),
      price: formData.get("price"),
    });

    const { data: newProduct } = response.data as any;
    if (response.status !== 201) {
      return null;
    }
    const file = formData.get("image") as File;
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    await axios.put(newProduct.uploadURL, file, options);

    return newProduct;
  }
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
