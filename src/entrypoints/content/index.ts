import type { ContentScriptContext } from "wxt/client";
import putBlind from "./put-blind";
import "./styles.css";
import messageTypes from "@/message-types";

let animationFrameId: number | null = null;
const scheduleUpdate = async <T extends Event>(
  callback: (e: T) => Promise<void>,
  e: T
) => {
  if (animationFrameId !== null) return;
  await new Promise<void>((resolve) => {
    animationFrameId = requestAnimationFrame(async () => {
      try {
        await callback(e);
      } finally {
        animationFrameId = null;
        resolve();
      }
    });
  });
};

export default defineContentScript({
  matches: ["<all_urls>"],
  main(ctx: ContentScriptContext) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log(message.type);
      if (message.type === messageTypes.updateBlinds.CALL) {
        scheduleUpdate(putBlind, new Event("update"));
      }
    });
    ctx.addEventListener(document, "mousemove", (e) => {
      scheduleUpdate(putBlind, e);
    });
  },
});
