"use strict";

const updateBadge = (isActive = false) => {
  const label = isActive ? "ON" : "OFF";
  const badgeColor = isActive ? "#0000FF" : "A9A9A9";

  browser.action.setBadgeText({ text: label });
  browser.action.setBadgeBackgroundColor({ 'color': badgeColor });
};

const initialize = () => {
  browser.storage.sync.get("isActive", (data) => {
    updateBadge(!!data.isActive);
  });
};

browser.runtime.onStartup.addListener(initialize);
browser.runtime.onInstalled.addListener(updateBadge);

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateTextColor") {
    browser.storage.sync.set({ "textColor": message.value });
  } else if (message.action === "updateShadowColor") {
    browser.storage.sync.set({ "shadowColor": message.value });
  }
});