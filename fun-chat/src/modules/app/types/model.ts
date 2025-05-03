import { socketGeneralType } from "./types";

export interface Model {
  createConnection(): Promise<string>;
  sendData(data: socketGeneralType): void;
}
