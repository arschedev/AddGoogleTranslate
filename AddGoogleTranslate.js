/**
 * Add Google Translate. Adds Google Translate to webpages
 * Copyright (c) 2022 Arseniy Chereda, aka arschedev
 *
 * Licensed under the GNU General Public License v2.0
 */

(function AddGoogleTranslate() {
  try {
    //! greeting
    console.log('🚀 AddGoogleTranslate');

    //! indent
    document.body.prepend(document.createElement('br'));

    //! creating google translate element
    let GTE = document.createElement('div');
    GTE.id = '__AGT__google_translate_element';
    document.body.prepend(GTE);

    //! preparing google translate to init
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

    //! loading google translate api
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