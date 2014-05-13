/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const { Hotkey } = require("sdk/hotkeys");
const sp = require("sdk/simple-prefs");

const OPEN = "open";

// Variables to store the hotkey combination.
let MODIFIER = sp.prefs['modifier'];
let KEY = sp.prefs['key'];

// A global Key object to store all the key instances
// with same object name.
let Key = {};

/**
 * Create a hotkey.
 * @param {Object} pan
 *    Panel that should be binded to the hotkey.
 * @return {Object} Key
 *    Hotkey object with binded panel.
 */
function createHotkey(pan) {
  Key = Hotkey({
    combo: MODIFIER + "-" + KEY,
    onPress: function() {
      if (sp.prefs['hotkey']) {
        pan.port.emit(OPEN);
        pan.show();
      }
      else{
      }
    }
  });

  return Key;
}
exports.createHotkey = createHotkey;

/**
 * Check hotkey pref value and disable/enable accordingly.
 * @param {Object} pan
 *    Panel to which the hotkey is binded.
 * @return {Function} keyCheck
 *    Function which performs the "hotkey" pref checking and
 *    disable/enable it.
 */
function hotkeyCheck(pan) {
  let keyCheck = function() {
    if (sp.prefs["hotkey"] == true) {
      Key = createHotkey(pan);
    } else {
      Key.destroy();
    }
  }

  return keyCheck;
}

/**
 * Apply the new key combination to the hotkey.
 * @param {Object} pan
 *    Panel to which the hotkey is binded.
 * @return {Function} keyChange
 *    Function which applies the changed key combination.
 */
function changeKey(pan) {
  let keyChange = function() {
    MODIFIER = sp.prefs["modifier"];
    KEY = sp.prefs["key"];
    if (!KEY) {
      KEY = "m";
    }

    Key.destroy();
    Key = createHotkey(pan);
  }

  return keyChange;
}

/**
 * Hotkey listener
 * @param {Object} pan
 *    Panel to which the hotkey is binded. 
 */
function listen(pan) {
  sp.on("hotkey", hotkeyCheck(pan));
  sp.on("modifier", changeKey(pan));
  sp.on("key", changeKey(pan));
}
exports.listen = listen;
