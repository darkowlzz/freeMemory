/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const time = require('sdk/timers');
const sp = require('sdk/simple-prefs');
const ss = require('sdk/simple-storage');
const { FreeMemory } = require('freememory');

const minuteMultiplier = 1000 * 60;

/**
 * Timer class for automatic memory minimization.
 */
function Timer(app) {
  let freeMemory = new FreeMemory(app);

  // Set the initial values.
  let interval = 0;
  let timer = null;

  /**
   * Set the timer and spawn future instanced of it.
   * Also, kill an instance when set time is changed.
   */
  let setTimer = () => {
    time.clearTimeout(timer);
    // Store in simple storage for persistant timer.
    ss.storage.timeout = sp.prefs['timeout'];
  
    let callback = function () {
      freeMemory.mm();
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

  setTimer();
  sp.on('timeout', setTimer);
}

exports.Timer = Timer;
