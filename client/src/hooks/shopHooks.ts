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

export const useRetrieveProductCategory = (): RetrieveCollectionReturnType => {
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
    //eslint-disable-next-line
  }, []);

  if (!shopService) {
    throw new Error("The ShopDataAdapterContext is required");
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
    //eslint-disable-next-line
  }, [categorySlug]);

  if (!shopService) {
    throw new Error("The ShopDataAdapterContext is required");
  }

  return productState;
};

export const useCreateProduct = (categorySlug: string) => {
  const shopService = useContext(
    ShopDataAdapterContext
  ) as IShopServiceInterface;

  const [productState, setProductState] = useState({
    products: {},
    loading: false,
  });

  async function createNewProduct(productArgs): Promise<boolean> {
    setProductState({
      ...productState,
      loading: true,
    });

    const newProduct = await shopService.createProduct(
      productArgs,
      categorySlug
    );
    if (!newProduct) alert("Something went wrong while creating product");
    setProductState({
      ...productState,
      products: newProduct,
      loading: false,
    });

    return !!newProduct;
  }

  if (!shopService) {
    throw new Error("The ShopDataAdapterContext is required");
  }

  return [productState, createNewProduct];
};

export default ShopDataAdapterContext;
