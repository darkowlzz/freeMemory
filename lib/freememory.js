/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const { Cc, Ci, Cu } = require('chrome');
const utils = require('sdk/window/utils');

// Custom modules
const { notify } = require('notify');

/**
 * FreeMemory class consisting of all the browser memory operation
 * calling methods.
 */
function FreeMemory(app) {
  const GCcompleted = "Garbage collection completed";
  const CCcompleted = "Cycle collection completed";
  const MMcompleted = "Memory Minimization completed";

  // Get Observer Service to notify various listeners later. 
  let os = Cc['@mozilla.org/observer-service;1']
           .getService(Ci.nsIObserverService);

  // Get the window object.
  // Used to invoke cycle collector.
  let window = utils.getMostRecentBrowserWindow();

  // Memory Report Manager.
  // Used to invoke minimize memory usage.
  let gMgr = Cc['@mozilla.org/memory-reporter-manager;1']
             .getService(Ci.nsIMemoryReporterManager);

  return {
    gc: () => {
      os.notifyObservers(null, 'child-gc-request', null);
      Cu.forceGC();
      notify(GCcompleted, app);
    },

    cc: () => {
      os.notifyObservers(null, 'child-cc-request', null);
      window.QueryInterface(Ci.nsIInterfaceRequestor)
            .getInterface(Ci.nsIDOMWindowUtils)
            .cycleCollect();
      notify(CCcompleted, app);
    },

    mm: () => {
      os.notifyObservers(null, 'child-mmu-request', null);
      gMgr.minimizeMemoryUsage(() => notify(MMcompleted, app));
    }
  }
}

exports.FreeMemory = FreeMemory;
