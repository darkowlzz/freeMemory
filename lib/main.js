// Import custom modules.
const hk = require("keys");
const panel = require("panel");
const widget = require("widget");
const timer = require("timer");

// Create a panel.
let pan = panel.createPanel();

// Panel pref change listener.
panel.listen();

// Create a widget and bind the panel to it.
let wid = widget.createWidget(pan);

// Initialize hotkey.
hk.createHotkey(pan);

// Hotkey pref change listener.
hk.listen(pan);

timer.listen(pan);
