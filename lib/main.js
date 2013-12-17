const widgets = require("sdk/widget");
const {Cu, Cc, Ci} = require("chrome");
const data = require("sdk/self").data;
const utils = require("sdk/window/utils");
const panel = require("sdk/panel");
const notifications = require("sdk/notifications");
const { Hotkey } = require("sdk/hotkeys");

// Import custom modules.
const hk = require("keys");

// Magical constants.
const GC = "GC";
const CC = "CC";
const MM = "MM";

const GCcompleted = "Garbage collection completed";
const CCcompleted = "Cycle collection completed";
const MMcompleted = "Memory Minimization completed";

const CLICKED = "clicked";
const COMBO = "alt-m";

// A panel to place the buttons and messages.
let pan = panel.Panel({
  width: 170,
  height: 160,
  contentURL: data.url("freeMemory.html"),
  contentScriptFile: data.url("freeMemory-script.js")
});

let widget = widgets.Widget({
  id: "freeMemory",
  label: "Free Memory",
  contentURL: data.url("freeMemory.png"), 
  panel: pan,
});

// Initialize hotkey.
hk.createHotkey(pan);

// Hotkey pref change listener.
hk.listen(pan);

// Notification to notify about the completion of operation.
let notify = function(message) {
  notifications.notify({
    text: message,
    iconURL: data.url("freeMemory.png")
  });
}

// Get Observer Service to notify various listeners later.
let os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);

// Get the window object.
// Used to invoke cycle collector.
let window = utils.getMostRecentBrowserWindow();

// Memory Report Manager.
// Used to invoke minimize memory usage.
let gMgr = Cc["@mozilla.org/memory-reporter-manager;1"]
           .getService(Ci.nsIMemoryReporterManager);


// Invoke GC.
pan.port.on(GC, function() {
  pan.hide();
  os.notifyObservers(null, "child-gc-request", null);
  Cu.forceGC();
  notify(GCcompleted);
});

// Invoke CC.
pan.port.on(CC, function() {
  pan.hide();
  os.notifyObservers(null, "child-cc-request", null);
  window.QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIDOMWindowUtils)
        .cycleCollect();
  notify(CCcompleted);
});

// Invoke MM.
pan.port.on(MM, function() {
  pan.hide();
  os.notifyObservers(null, "child-mmu-request", null);
  gMgr.minimizeMemoryUsage(() => notify(MMcompleted));
});

// To hide the panel when an option is clicked.
pan.port.on(CLICKED, function() {
  pan.hide();
});
