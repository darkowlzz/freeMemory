const app = require('sdk/system/xul-app');

let appinfo = app.name;

// Check the app name and initiate appropriately.
if (appinfo == 'Fennec') {
  let { Mobile } = require('mobile');
  let mobile = new Mobile(appinfo);
}
else {
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

  // Timer listener.
  timer.listen();
}
