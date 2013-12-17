const { Hotkey } = require("sdk/hotkeys");
const sp = require("sdk/simple-prefs");

const COMBO = "alt-m";
const OPEN = "open";

let showKey = {};

// Create a hotkey.
function createHotkey(pan) {
  showKey = Hotkey({
    combo: COMBO,
    onPress: function() {
      pan.port.emit(OPEN);
      pan.show();
    }
  });

  return showKey;
}
exports.createHotkey = createHotkey;

// Check hotkey pref value and disable/enable accordingly.
function hotkeyCheck(pan) {
  let keyCheck = function() {
    if (sp.prefs["hotkey"] == true) {
      showKey = createHotkey(pan);
    } else {
      showKey.destroy();
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
