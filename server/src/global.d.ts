import { Request } from "express";
export type RequestType = Request & {
  decoded: string | Record<string, any>;
  data: Record<string, any>;
};
