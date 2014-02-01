const time = require("sdk/timers");
const sp = require("sdk/simple-prefs");
const ss = require("sdk/simple-storage");
const { Cc, Ci } = require("chrome");

// Import custom modules.
const notify = require("notify");

const MM = "MM";
const minuteMultiplier = 1000 * 60;

// NOTE: Get rid of this repetition. Import panel.js and use it.
let os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
let gMgr = Cc["@mozilla.org/memory-reporter-manager;1"]
           .getService(Ci.nsIMemoryReporterManager);

// Memory Minimization
function minimize() {
  os.notifyObservers(null, "child-mmu-request", null);
  gMgr.minimizeMemoryUsage(() => notify.notify("Memory minimization completed"));
}

// Set the initial values.
let interval = 0;
let timer = {};

/**
 * Set the timer and spawn future instanced of it.
 * Also, kill an instance when set time is changed.
 */
function setTimer() {
  time.clearTimeout(timer);
  // Store in simple storage for persistant timer.
  ss.storage.timeout = sp.prefs["timeout"];
  
  let callback = function () {
    minimize();
    tim();
  }

  let tim = function () {
    interval = ss.storage.timeout;
    if (interval != 0) {
      timer = time.setTimeout(callback, interval*minuteMultiplier);
    }
  }

  tim();
}

function listen() {
  setTimer();
  sp.on("timeout", setTimer);
}
exports.listen = listen;
