"use strict";

const updateBadge = (isActive = false) => {
  const label = isActive ? "ON" : "OFF";
  const badgeColor = isActive ? "#0000FF" : "#A9A9A9";

  browser.action.setBadgeText({ text: label });
  browser.action.setBadgeBackgroundColor({ 'color': badgeColor });
};

const apply = () => {
  browser.storage.sync.remove(["timestamp"], () => {
    browser.storage.sync.set({
      "timestamp": Date.now()
    });
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

  browser.storage.sync.set({
    "isActive": isActive,
    "timestamp": Date.now()
  });
  updateBadge(isActive);
  reloadBtn.style.display = isActive ? "block" : "none";

  if (!isActive) {
    textInput.value = '';
    browser.storage.sync.set({
      "targetText": textInput.value
    })
    apply();
  }
});

reloadBtn.addEventListener("click", () => {
  const inputValue = textInput.value;
  const selectedMode = modeSelect.value;

  browser.storage.sync.set({
    "targetText": inputValue,
    "mode": selectedMode
  }, () => {
    apply();
  });
});