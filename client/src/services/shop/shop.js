import shopData from "./shop.data";

class ShopModel {
  getProductsInCollection(collectionId) {
    return shopData[collectionId];
  }

  getCollections() {
    return Object.values(shopData).sort((a, b) => a.id - b.id);
  }
}

const shopModel = new ShopModel();

export default shopModel;
