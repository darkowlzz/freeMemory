const { Hotkey } = require("sdk/hotkeys");
const sp = require("sdk/simple-prefs");

const COMBO = "alt-m";
const OPEN = "open";

// A global Key object to store all the key instances
// with same object name.
let Key = {};

// Create a hotkey.
function createHotkey(pan) {
  Key = Hotkey({
    combo: COMBO,
    onPress: function() {
      pan.port.emit(OPEN);
      pan.show();
    }
  });

  return Key;
}
exports.createHotkey = createHotkey;

// Check hotkey pref value and disable/enable accordingly.
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
exports.hotkeyCheck = hotkeyCheck;

// Hotkey listener
function listen(pan) {
  sp.on("hotkey", hotkeyCheck(pan));
}
exports.listen = listen;
