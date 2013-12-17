const widgets = require("sdk/widget");
const data = require("sdk/self").data;

// Import custom modules.
const hk = require("keys");
const panel = require("panel");

const ICON = "freeMemory.png";

// Create a panel.
let pan = panel.createPanel();

// Create a widget and bind the panel to it.
let widget = widgets.Widget({
  id: "freeMemory",
  label: "Free Memory",
  contentURL: data.url(ICON), 
  panel: pan,
});

// Initialize hotkey.
hk.createHotkey(pan);

// Hotkey pref change listener.
hk.listen(pan);
