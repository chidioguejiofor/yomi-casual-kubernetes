type DataType = Record<string, any>;
export interface UsecaseResponseType {
  message: string;
  statusCode: number;
  data?: DataType | DataType[];
  errors?: DataType | DataType[];
}
