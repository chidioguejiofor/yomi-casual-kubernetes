import { useContext, useState, useEffect } from "react";
import { ShopDataAdapterContext } from "../context/ShopDataAdapterContext";
import { Collection, IShopServiceInterface, Product } from "../interfaces";

type RetrieveCollectionReturnType = {
  loading: boolean;
  collections: Collection[];
};

type RetrieveProductsReturnType = {
  loading: boolean;
  products: Product[];
  category: null | Collection;
};

export const useRetrieveCollections = (): RetrieveCollectionReturnType => {
  const shopService = useContext(ShopDataAdapterContext);

  const [collectionsArguments, setCollectionsArguments] = useState({
    collections: [],
    loading: false,
  });

  useEffect(() => {
    async function getInitialData() {
      setCollectionsArguments({
        ...collectionsArguments,
        loading: true,
      });

      const data = await shopService.getCollections();
      setCollectionsArguments({
        ...collectionsArguments,
        collections: data,
      });
    }

    getInitialData();
  }, []);

  if (!shopService) {
    throw "The ShopDataAdapterContext is required";
  }

  return collectionsArguments;
};

export const useRetrieveProducts = (
  categorySlug: string
): RetrieveProductsReturnType => {
  const shopService = useContext(
    ShopDataAdapterContext
  ) as IShopServiceInterface;

  const [productState, setProductState] = useState({
    products: [],
    loading: false,
    category: {},
  });

  useEffect(() => {
    async function getInitialData() {
      setProductState({
        ...productState,
        loading: true,
      });

      const category = await shopService.getSingleCollection(categorySlug);
      const data = await shopService.getProductsInCollection(category.id);
      setProductState({
        ...productState,
        products: data,
        category,
      });
    }

    getInitialData();
  }, [categorySlug]);

  if (!shopService) {
    throw "The ShopDataAdapterContext is required";
  }

  return productState;
};

export default ShopDataAdapterContext;
