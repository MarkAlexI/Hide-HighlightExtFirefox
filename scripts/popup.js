"use strict";

const updateBadge = (isActive = false) => {
  const label = isActive ? "ON" : "OFF";
  const badgeColor = isActive ? "#0000FF" : "#A9A9A9";

  browser.action.setBadgeText({ text: label });
  browser.action.setBadgeBackgroundColor({ 'color': badgeColor });
};

const reload = () => {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.reload(tabs[0].id);
  });
};

const toggleSwitch = document.getElementById("toggle-visibility");
const textInput = document.getElementById("blur-text");
const modeSelect = document.getElementById("mode-select");
const reloadBtn = document.getElementById("reload");

browser.storage.sync.get(["isActive", "targetText", "mode"], (data) => {
  toggleSwitch.checked = !!data.isActive;
  updateBadge(data.isActive);
  textInput.value = data.targetText || "";
  modeSelect.value = data.mode || "blur";
  reloadBtn.style.display = data.isActive ? "block" : "none";
});

toggleSwitch.addEventListener("change", (event) => {
  const isActive = event.target.checked;
  browser.storage.sync.set({ "isActive": isActive });
  updateBadge(isActive);
  reloadBtn.style.display = isActive ? "block" : "none";
});

textInput.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  browser.storage.sync.set({ "targetText": inputValue });
});

modeSelect.addEventListener("change", (event) => {
  const selectedMode = event.target.value;
  browser.storage.sync.set({ "mode": selectedMode });
});

reloadBtn.addEventListener("click", () => {
  reload();
});
