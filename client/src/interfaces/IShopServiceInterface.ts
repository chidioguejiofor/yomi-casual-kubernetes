import { Collection } from "./ICollection";

export interface IShopServiceInterface {
  getProductsInCollection(collectionId): any;
  getCollections(): Promise<Collection>;
}
