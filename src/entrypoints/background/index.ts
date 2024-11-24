import appStorage from "@/repositories/storage";
// somehow extension ".d.ts" is needed.
import { defaultConfig } from "@/types/config.d.ts";
import messageType, { messageIsForThisApp } from "@/message-types";

let cacheConfig = defaultConfig;

const initCache = async () => {
  cacheConfig = await appStorage.getAll();
};

const getter = (type: string) => {
  if (type === messageType.config.GET) {
    return cacheConfig;
  } else if (type === messageType.isActivated.GET) {
    return cacheConfig.isActivated;
  } else if (type === messageType.isHorizontal.GET) {
    return cacheConfig.isHorizontal;
  } else if (type === messageType.spaceSize.GET) {
    return cacheConfig.spaceSize;
  } else if (type === messageType.maxSpaceSize.GET) {
    return cacheConfig.maxSpaceSize;
  } else if (type === messageType.opacity.GET) {
    return cacheConfig.opacity;
  } else {
    return undefined;
  }
};
const setter = async (type: string, value: any) => {
  if (type === messageType.config.SET) {
    const result = [
      appStorage.IsActivated.setValue(value.isActivated),
      appStorage.IsHorizontal.setValue(value.isHorizontal),
      appStorage.SpaceSize.setValue(value.spaceSize),
      appStorage.MaxSpaceSize.setValue(value.maxSpaceSize),
      appStorage.Opacity.setValue(value.opacity),
    ];
    await Promise.all(result);
    cacheConfig = value;
  } else if (type === messageType.isActivated.SET) {
    await appStorage.IsActivated.setValue(value);
    cacheConfig.isActivated = value;
  } else if (type === messageType.isHorizontal.SET) {
    await appStorage.IsHorizontal.setValue(value);
    cacheConfig.isHorizontal = value;
  } else if (type === messageType.spaceSize.SET) {
    await appStorage.SpaceSize.setValue(value);
    cacheConfig.spaceSize = value;
  } else if (type === messageType.maxSpaceSize.SET) {
    await appStorage.MaxSpaceSize.setValue(value);
    cacheConfig.maxSpaceSize = value;
  } else if (type === messageType.opacity.SET) {
    await appStorage.Opacity.setValue(value);
    cacheConfig.opacity = value;
  } else {
    return undefined;
  }
};

export default defineBackground({
  main: async () => {
    await initCache();
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (messageIsForThisApp(message.type)) {
        let result =
          getter(message.type) || setter(message.type, message.value);
        sendResponse(result);
      }
    });
  },
});
