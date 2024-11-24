import { AppConfig } from "@/types/config";
import messageType from "@/message-types";

const getIsActivated = async (): Promise<boolean> => {
  const result = chrome.runtime.sendMessage({
    type: messageType.isActivated.GET,
  });
  return result;
};
const getIsHorizontal = async (): Promise<boolean> => {
  const result = chrome.runtime.sendMessage({
    type: messageType.isHorizontal.GET,
  });
  return result;
};
const getSpaceSize = async (): Promise<number> => {
  const result = chrome.runtime.sendMessage({
    type: messageType.spaceSize.GET,
  });
  return result;
};
const getMaxSpaceSize = async (): Promise<number> => {
  const result = chrome.runtime.sendMessage({
    type: messageType.maxSpaceSize.GET,
  });
  return result;
};
const getOpacity = async (): Promise<number> => {
  const result = chrome.runtime.sendMessage({ type: messageType.opacity.GET });
  return result;
};
const getConfig = async (): Promise<AppConfig> => {
  const result = chrome.runtime.sendMessage({ type: messageType.config.GET });
  return result;
};
const setConfig = async (value: AppConfig) => {
  const result = chrome.runtime.sendMessage({
    type: messageType.config.SET,
    value,
  });
  return result;
};
const setIsActivated = async (value: boolean) => {
  const result = chrome.runtime.sendMessage({
    type: messageType.isActivated.SET,
    value,
  });
  return result;
};
const setIsHorizontal = async (value: boolean) => {
  const result = chrome.runtime.sendMessage({
    type: messageType.isHorizontal.SET,
    value,
  });
  return result;
};
const setSpaceSize = async (value: number) => {
  const result = chrome.runtime.sendMessage({
    type: messageType.spaceSize.SET,
    value,
  });
  return result;
};
const setMaxSpaceSize = async (value: number) => {
  const result = chrome.runtime.sendMessage({
    type: messageType.maxSpaceSize.SET,
    value,
  });
  return result;
};
const setOpacity = async (value: number) => {
  const result = chrome.runtime.sendMessage({
    type: messageType.opacity.SET,
    value,
  });
  return result;
};
const updateBlinds = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    chrome.tabs.sendMessage(tabs[0].id!, {
      type: messageType.updateBlinds.CALL,
    });
  });
};

const bgApi = {
  getIsActivated,
  getIsHorizontal,
  getSpaceSize,
  getMaxSpaceSize,
  getOpacity,
  getConfig,
  setConfig,
  setIsActivated,
  setIsHorizontal,
  setSpaceSize,
  setMaxSpaceSize,
  setOpacity,
  updateBlinds,
};

export default bgApi;
