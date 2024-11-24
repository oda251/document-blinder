import type { AppConfig } from "./config";

export interface Storage<T> {
  getValue(): Promise<T>;
  setValue(T): Promise<void>;
}

export interface AppStorage {
  IsActivated: Storage<boolean>;
  IsHorizontal: Storage<boolean>;
  SpaceSize: Storage<number>;
  MaxSpaceSize: Storage<number>;
  Opacity: Storage<number>;
  getAll(): Promise<AppConfig>;
}
