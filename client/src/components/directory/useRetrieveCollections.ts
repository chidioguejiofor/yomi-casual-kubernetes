import { useContext, useState, useEffect } from "react";
import { ShopDataAdapterContext } from "../../context/ShopDataAdapterContext";
import { Collection } from "../../interfaces";

type RetrieveCollectionReturnType = {
  loading: boolean;
  collections: Collection[];
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

export default ShopDataAdapterContext;
