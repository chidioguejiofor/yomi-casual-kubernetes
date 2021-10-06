export interface ICache {
  cacheData: (
    key: string,
    data: Record<string, any>,
    expireTime: number
  ) => void;
  deleteByPattern: (pattern: string) => Promise<any>;
  retrieveValue: (pattern: string) => Promise<any>;
  keys: (pattern: string) => Promise<any>;
}
