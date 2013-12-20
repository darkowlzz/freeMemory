const t = require("sdk/timers");
const sp = require("sdk/simple-prefs");
const { Cc, Ci } = require("chrome");

const notify = require("notify");

const minuteMultiplier = 1000 * 60;

let os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
let gMgr = Cc["@mozilla.org/memory-reporter-manager;1"]
           .getService(Ci.nsIMemoryReporterManager);

function minimize() {
  os.notifyObservers(null, "child-mmu-request", null);
  gMgr.minimizeMemoryUsage(() => notify.notify("Memory minimization completed"));
}

const MM = "MM";

let interval = 0;
let timer = {};

function setTimer(pan) {
  console.log("setTimer :D");
  t.clearTimeout(timer);
  
  let callback = function () {
    minimize();
    tim();
  }

  let tim = function () {
    interval = sp.prefs["timeout"];
    if (interval != 0) {
      timer = t.setTimeout(callback, interval*minuteMultiplier);
    }
  }

  tim();
}

function listen(pan) {
  sp.on("timeout", setTimer);
}
exports.listen = listen;
