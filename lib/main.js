// Import custom modules.
const hk = require("keys");
const panel = require("panel");
const widget = require("widget");

// Create a panel.
let pan = panel.createPanel();

// Create a widget and bind the panel to it.
let wid = widget.createWidget(pan);

// Initialize hotkey.
hk.createHotkey(pan);

// Hotkey pref change listener.
hk.listen(pan);
