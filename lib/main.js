var widgets = require("sdk/widget");
var {Cu, Cc, Ci} = require("chrome");
var data = require("sdk/self").data;
var utils = require("sdk/window/utils");
var panel = require("sdk/panel");

var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);

var window = utils.getMostRecentBrowserWindow();

var gMgr = Cc["@mozilla.org/memory-reporter-manager;1"]
           .getService(Ci.nsIMemoryReporterManager);

var pan = panel.Panel({
  width: 150,
  height: 120,
  contentURL: data.url("buttons.html"),
  contentScriptFile: data.url("button-script.js")
});

var widget = widgets.Widget({
  id: "freeMemory",
  label: "Free Memory",
  contentURL: "http://www.mozilla.org/favicon.ico",
  panel: pan,
});

pan.port.on("GC", function() {
  var title = utils.getWindowTitle(window);
  console.log("Garbage Collected");

  os.notifyObservers(null, "child-gc-request", null);
  Cu.forceGC();
  pan.port.emit("GC!");
});

pan.port.on("CC", function() {
  console.log("Cycle collected");

  os.notifyObservers(null, "child-cc-request", null);
  window.QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIDOMWindowUtils)
        .cycleCollect();
  pan.port.emit("CC!");
});

pan.port.on("MM", function() {
  console.log("Minimizing M");

  os.notifyObservers(null, "child-mmu-request", null);
  gMgr.minimizeMemoryUsage(() => pan.port.emit("MM!"));
});
