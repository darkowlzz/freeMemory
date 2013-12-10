var widgets = require("sdk/widget");
var {Cu, Cc, Ci} = require("chrome");
var data = require("sdk/self").data;
var utils = require("sdk/window/utils");

var ps = Cc["@mozilla.org/embedcomp/prompt-service;1"].
         getService(Ci.nsIPromptService);

var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);

var window = utils.getMostRecentBrowserWindow();

var gMgr = Cc["@mozilla.org/memory-reporter-manager;1"]
           .getService(Ci.nsIMemoryReporterManager);

var widget = widgets.Widget({
  id: "mozilla-link",
  width: 150,
  label: "Garbage Collector",
  contentURL: data.url("buttons.html"),
  contentScriptFile: data.url("button-script.js")
});

widget.port.on("GC", function() {
  var title = utils.getWindowTitle(window);
  ps.alert(null, "GC", "yeah!! We collect garbage " + title);
  console.log("Garbage Collected");

  os.notifyObservers(null, "child-gc-request", null);
  Cu.forceGC();
});

widget.port.on("CC", function() {
  ps.alert(null, "CC", "Cycle collection!");
  console.log("Cycle collected");

  os.notifyObservers(null, "child-cc-request", null);
  window.QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIDOMWindowUtils)
        .cycleCollect();
});

widget.port.on("MM", function() {
  ps.alert(null, "MM", "Minimizing memory!");
  console.log("Minimizing M");
  os.notifyObservers(null, "child-mmu-request", null);
  gMgr.minimizeMemoryUsage(() => {});
});
