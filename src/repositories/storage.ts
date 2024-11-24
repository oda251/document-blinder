import config from "@config";
import type { Storage, AppStorage } from "@/types/storage";
import type { AppConfig } from "@/types/config";
import { WxtStorageItem } from "wxt/storage";

class isActivatedImpl implements Storage<boolean> {
  storage: WxtStorageItem<boolean, {}> = storage.defineItem<boolean>(
    "local:isActivated",
    {
      defaultValue: config.isActivated.default,
      fallback: config.isActivated.fallback,
    }
  );
  async getValue(): Promise<boolean> {
    const value = await storage.getItem<boolean>("local:isActivated");
    return value ?? config.isActivated.default;
  }
  async setValue(value: boolean) {
    await storage.setItem("local:isActivated", value);
  }
}

class isHorizontalImpl implements Storage<boolean> {
  storage: WxtStorageItem<boolean, {}> = storage.defineItem<boolean>(
    "local:isHorizontal",
    {
      defaultValue: config.isHorizontal.default,
      fallback: config.isHorizontal.fallback,
    }
  );
  async getValue(): Promise<boolean> {
    const value = await storage.getItem<boolean>("local:isHorizontal");
    return value ?? config.isHorizontal.default;
  }
  async setValue(value: boolean) {
    await storage.setItem("local:isHorizontal", value);
  }
}

class spaceSizeImpl implements Storage<number> {
  storage: WxtStorageItem<number, {}> = storage.defineItem<number>(
    "local:spaceSize",
    {
      defaultValue: config.spaceSize.default,
      fallback: config.spaceSize.fallback,
    }
  );
  async getValue(): Promise<number> {
    const value = await storage.getItem<number>("local:spaceSize");
    return value ?? config.spaceSize.default;
  }
  async setValue(value: number) {
    await storage.setItem("local:spaceSize", value);
  }
}

class maxSpaceSizeImpl implements Storage<number> {
  storage: WxtStorageItem<number, {}> = storage.defineItem<number>(
    "local:maxSpaceSize",
    {
      defaultValue: config.spaceSize.max.default,
      fallback: config.spaceSize.max.fallback,
    }
  );
  async getValue(): Promise<number> {
    const value = await storage.getItem<number>("local:maxSpaceSize");
    return value ?? config.spaceSize.max.default;
  }
  async setValue(value: number) {
    await storage.setItem("local:maxSpaceSize", value);
  }
}

class opacityImpl implements Storage<number> {
  storage: WxtStorageItem<number, {}> = storage.defineItem<number>(
    "local:opacity",
    {
      defaultValue: config.opacity.default,
      fallback: config.opacity.fallback,
    }
  );
  async getValue(): Promise<number> {
    const value = await storage.getItem<number>("local:opacity");
    return value ?? config.opacity.default;
  }
  async setValue(value: number) {
    await storage.setItem("local:opacity", value);
  }
}

class AppStorageImpl implements AppStorage {
  IsActivated: isActivatedImpl = new isActivatedImpl();
  IsHorizontal: isHorizontalImpl = new isHorizontalImpl();
  SpaceSize: spaceSizeImpl = new spaceSizeImpl();
  MaxSpaceSize: maxSpaceSizeImpl = new maxSpaceSizeImpl();
  Opacity: opacityImpl = new opacityImpl();
  async getAll(): Promise<AppConfig> {
    const result = await Promise.all([
      this.IsActivated.getValue(),
      this.IsHorizontal.getValue(),
      this.SpaceSize.getValue(),
      this.MaxSpaceSize.getValue(),
      this.Opacity.getValue(),
    ]);
    return {
      isActivated: result[0],
      isHorizontal: result[1],
      spaceSize: result[2],
      maxSpaceSize: result[3],
      opacity: result[4],
    };
  }
}

const appStorage = new AppStorageImpl();

export default appStorage;
