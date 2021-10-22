import { Collection, Product } from "./ICollection";

export interface IShopServiceInterface {
  getProductsInCollection(collectionId: string): Promise<Product[]>;
  getCollections(): Promise<Collection[]>;
  getSingleCollection(collectionId: string): Promise<Collection>;
  createProduct(product, categoryId: string): Promise<Product>;
}
