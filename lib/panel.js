const panel = require('sdk/panel');
const { data } = require('sdk/self');
const sp = require('sdk/simple-prefs');
const { FreeMemory } = require('freememory');
const { Cu } = require('chrome');

// Magic recipes.
const GC = 'GC';
const CC = 'CC';
const MM = 'MM';

const CLICKED = 'clicked';
const HELP = 'HELP';
const ABOUTMEMORY = 'about:memory';
const ABOUTADDONSMEMORY = 'about:addons-memory';
const AAMid = 'about-addons-memory@tn123.org';
const INSTALLAAM = 'install aam';
const AAMlink = 'https://addons.mozilla.org/en-us/firefox/addon/about-addons-memory/';

/**
 * Create a panel.
 * @return {Object} pan
 *    Panel object with all the required properties.
 */
function createPanel() {
  // Create a freeMemory object.
  let freeMemory = new FreeMemory();

  let { AddonManager } = Cu.import('resource://gre/modules/AddonManager.jsm');

  // Specifications of panel.
  pan = panel.Panel({
    width: sp.prefs['width'],
    height: sp.prefs['height'],
    contentURL: data.url('freeMemory.html'),
    onShow: () => {
      // Query addonmanager to find if AAM is installed.
      AddonManager.getAddonByID(AAMid, function(addon) {
        if (addon) {
          // Check if AAM is disabled.
          if ((!addon.appDisabled && !addon.softDisabled) &&
               !addon.userDisabled) {
            pan.port.emit('AAM');
          }
          else {
            pan.port.emit('AAMdisabled');
          }
        }
        else {
          pan.port.emit('noAAM');
        }
      })
    }
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
    require('sdk/tabs').open(data.url('index.html'));
  });

  // Open about:memory
  pan.port.on(ABOUTMEMORY, function() {
    require('sdk/tabs').open(ABOUTMEMORY);
  });

  // Open about:addons-memory
  pan.port.on(ABOUTADDONSMEMORY, function() {
    require('sdk/tabs').open(ABOUTADDONSMEMORY);
  });

  // Open link to install about:addons-memory
  pan.port.on(INSTALLAAM, function() {
    require('sdk/tabs').open(AAMlink);
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
  sp.on('height', panelCheck);
  sp.on('width', panelCheck);
}
exports.listen = listen;

function timedMinimize() {
  os.notifyObservers(null, 'child-mmu-request', null);
  gMgr.minimizeMemoryUsage(() => notify.notify(MMcompleted));
}
exports.timedMinimize = timedMinimize;
