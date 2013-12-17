const panel = require("sdk/panel");
const data = require("sdk/self").data;
const utils = require("sdk/window/utils");
const {Cu, Cc, Ci} = require("chrome");

// Custom modules.
const notify = require("notify");

// Magic recipes.
const GC = "GC";
const CC = "CC";
const MM = "MM";

const GCcompleted = "Garbage collection completed";
const CCcompleted = "Cycle collection completed";
const MMcompleted = "Memory Minimization completed";

const CLICKED = "clicked";


// Get Observer Service to notify various listeners later.
let os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);

// Get the window object.
// Used to invoke cycle collector.
let window = utils.getMostRecentBrowserWindow();

// Memory Report Manager.
// Used to invoke minimize memory usage.
let gMgr = Cc["@mozilla.org/memory-reporter-manager;1"]
           .getService(Ci.nsIMemoryReporterManager);

/**
 * Create a panel.
 * @return {Object} pan
 *    Panel object with all the required properties.
 */
function createPanel() {
  // Specifications of panel.
  pan = panel.Panel({
    width: 170,
    height: 160,
    contentURL: data.url("freeMemory.html"),
    contentScriptFile: data.url("freeMemory-script.js")
  });

  /* Listeners of the created panel */

  // Invoke GC.
  pan.port.on(GC, function() {
    pan.hide();
    os.notifyObservers(null, "child-gc-request", null);
    Cu.forceGC();
    notify.notify(GCcompleted);
  });

  // Invoke CC.
  pan.port.on(CC, function() {
    pan.hide();
    os.notifyObservers(null, "child-cc-request", null);
    window.QueryInterface(Ci.nsIInterfaceRequestor)
          .getInterface(Ci.nsIDOMWindowUtils)
          .cycleCollect();
    notify.notify(CCcompleted);
  });

  // Invoke MM.
  pan.port.on(MM, function() {
    pan.hide();
    os.notifyObservers(null, "child-mmu-request", null);
    gMgr.minimizeMemoryUsage(() => notify.notify(MMcompleted));
  });

  // To hide the panel when an option is clicked.
  pan.port.on(CLICKED, function() {
    pan.hide();
  });

  return pan;
}
exports.createPanel = createPanel;
