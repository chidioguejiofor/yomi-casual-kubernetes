type DataType = Record<string, any>;
export interface ResponseType {
  message: string;
  statusCode: number;
  data?: DataType | DataType[];
  errors?: DataType | DataType[];
}
