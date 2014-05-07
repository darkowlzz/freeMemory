const panel = require("sdk/panel");
const { data } = require("sdk/self");
const sp = require("sdk/simple-prefs");
const { FreeMemory } = require('freememory');

// Magic recipes.
const GC = "GC";
const CC = "CC";
const MM = "MM";

const CLICKED = "clicked";
const HELP = "HELP";
const ABOUTMEMORY = "about:memory"

/**
 * Create a panel.
 * @return {Object} pan
 *    Panel object with all the required properties.
 */
function createPanel() {
  // Create a freeMemory object.
  let freeMemory = new FreeMemory();

  // Specifications of panel.
  pan = panel.Panel({
    width: sp.prefs['width'],
    height: sp.prefs['height'],
    contentURL: data.url("freeMemory.html")
  });

  /* Listeners of the created panel */

  // Invoke GC.
  pan.port.on(GC, function() {
    pan.hide();
    freeMemory.gc();
  });

  // Invoke CC.
  pan.port.on(CC, function() {
    pan.hide();
    freeMemory.cc();
  });

  // Invoke MM.
  pan.port.on(MM, function() {
    pan.hide();
    freeMemory.mm();
  });

  // To hide the panel when an option is clicked.
  pan.port.on(CLICKED, function() {
    pan.hide();
  });

  // Listen to HELP option and open add-on page.
  pan.port.on(HELP, function() {
    require("sdk/tabs").open(data.url("index.html"));
  });

  pan.port.on(ABOUTMEMORY, function() {
    require("sdk/tabs").open(ABOUTMEMORY);
  });

  return pan;
}
exports.createPanel = createPanel;

/**
 * Resize panel dimensions as per the values in pref.
 */
function panelCheck() {
  pan.resize(sp.prefs['width'], sp.prefs['height']);
}

/**
 * Register 'height' and 'width' listeners.
 */
function listen(){
  sp.on("height", panelCheck);
  sp.on("width", panelCheck);
}
exports.listen = listen;

function timedMinimize() {
  os.notifyObservers(null, "child-mmu-request", null);
  gMgr.minimizeMemoryUsage(() => notify.notify(MMcompleted));
}
exports.timedMinimize = timedMinimize;
