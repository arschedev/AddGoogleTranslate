/**
 * Add Google Translate. Adds Google Translate to webpages
 * Copyright (c) 2022 Arseniy Chereda, aka arschedev
 *
 * Licensed under the GNU General Public License v2.0
 */

//! Utils
/**
 * Wait until element exists, then returns that element;
 * e.g. `GetElement(<query>).then(element => console.log(element))`
 * @param {string} sel - Selector (element query)
 * @returns {Promise<HTMLElement>} - HTML element
 */
function GetElement(sel) {
  return new Promise(resolve => {
    if (document.querySelector(sel)) {
      setTimeout(() => resolve(document.querySelector(sel)), 1);
      return;
    }
    let observer = new MutationObserver(() => {
      if (document.querySelector(sel)) {
        setTimeout(() => resolve(document.querySelector(sel)), 1);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree:   true
    });
  });
}

//! Start
(function AddGoogleTranslate() {
  try {
    //! greet
    console.log('🚀 AddGoogleTranslate');

    //! indent
    document.body.prepend(document.createElement('br'));

    //! create google translate element
    let GTE = document.createElement('div');
    GTE.id = '__AGT__google_translate_element';
    document.body.prepend(GTE);

    //! prepare google translate to init
    function AddGoogleTranslateInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'auto',
        layout:       google.translate.TranslateElement.InlineLayout.SIMPLE
      }, '__AGT__google_translate_element');
    }

    let GT_I = document.createElement('script');
    GT_I.type = 'text/javascript';
    GT_I.textContent = AddGoogleTranslateInit.toString();
    document.body.appendChild(GT_I);

    //! remove goog-te-gadget
    GetElement('.skiptranslate.goog-te-gadget')
        .then(r => {
          r.remove();
        });

    //! load google translate api
    let GT_API = document.createElement('script');
    GT_API.type = 'text/javascript';
    GT_API.src = 'https://translate.google.com/translate_a/element.js?cb=AddGoogleTranslateInit';
    document.body.appendChild(GT_API);

    //! completed
    console.log('✔️ AddGoogleTranslate');
  } catch (e) {
    //! error
    console.log(`⚠️ AddGoogleTranslate: ${e}`);
  }
})();