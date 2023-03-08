/**
 * Copyright (c) 2022 arschedev
 */

//! Button
browser.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
  browser.pageAction.setTitle({ tabId: tab.id, title: 'Add Google Translate' });
  browser.pageAction.setIcon({ tabId: tab.id, path: './resources/icons/icon.png' });
  browser.pageAction.show(tab.id);
});

//! Click
browser.pageAction.onClicked.addListener((tab) => {
  browser.tabs.executeScript(tab.id, {
    file: './resources/scripts/AddGoogleTranslate.js'
  });
});
