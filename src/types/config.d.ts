import config from "@/../config.json";

export interface AppConfig {
  isActivated: boolean;
  isHorizontal: boolean;
  spaceSize: number;
  maxSpaceSize: number;
  opacity: number;
}

export const defaultConfig: AppConfig = {
  isActivated: config.isActivated.default,
  isHorizontal: config.isHorizontal.default,
  spaceSize: config.spaceSize.default,
  maxSpaceSize: config.spaceSize.max.default,
  opacity: config.opacity.default,
};
