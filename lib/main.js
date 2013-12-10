var widgets = require("sdk/widget");
var {Cu, Cc, Ci} = require("chrome");
var data = require("sdk/self").data;
var utils = require("sdk/window/utils");
var panel = require("sdk/panel");

// Magical constants.
const GC = "GC";
const CC = "CC";
const MM = "MM";

const COMPLETED = "completed";

const GCcompleted = "Garbage collection completed";
const CCcompleted = "Cycle collection completed";
const MMcompleted = "Memory Minimization completed";


// A panel to place the buttons and messages.
var pan = panel.Panel({
  width: 140,
  height: 90,
  contentURL: data.url("freeMemory.html"),
  contentScriptFile: data.url("freeMemory-script.js")
});

var widget = widgets.Widget({
  id: "freeMemory",
  label: "Free Memory",
  contentURL: data.url("freeMemory.png"), 
  panel: pan,
});


// Get Observer Service to notify various listeners later.
var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);

// Get the window object.
// Used to invoke cycle collector.
var window = utils.getMostRecentBrowserWindow();

// Memory Report Manager.
// Used to invoke minimize memory usage.
var gMgr = Cc["@mozilla.org/memory-reporter-manager;1"]
           .getService(Ci.nsIMemoryReporterManager);


// Invoke GC.
pan.port.on(GC, function() {
  os.notifyObservers(null, "child-gc-request", null);
  Cu.forceGC();
  pan.port.emit(COMPLETED, GCcompleted);
});

// Invoke CC.
pan.port.on(CC, function() {
  os.notifyObservers(null, "child-cc-request", null);
  window.QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIDOMWindowUtils)
        .cycleCollect();
  pan.port.emit(COMPLETED, CCcompleted);
});

// Invoke MM.
pan.port.on("MM", function() {
  os.notifyObservers(null, "child-mmu-request", null);
  gMgr.minimizeMemoryUsage(() => pan.port.emit(COMPLETED, MMcompleted));
});
