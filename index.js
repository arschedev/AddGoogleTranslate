/**
 * Add Google Translate. Adds Google Translate to webpages
 * Copyright (c) 2022 Arseniy Chereda, aka arschedev
 *
 * Licensed under the GNU General Public License v2.0
 */


//! Button
browser.tabs.onUpdated.addListener((_id, _change, tab) => {
  browser.pageAction.setTitle({tabId: tab.id, title: 'Add Google Translate'});
  browser.pageAction.setIcon({tabId: tab.id, path: "./icons/icon.png"});
  browser.pageAction.show(tab.id);
});

//! Click
browser.pageAction.onClicked.addListener((tab) => {
  browser.tabs.executeScript(tab.id, {
    file: "./AddGoogleTranslate.js"
  });
});