/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

let nw = require('nativewindow');
const { FreeMemory } = require('freememory');
const { Timer } = require('timer');
const tabs = require('sdk/tabs');

function Mobile(app) {
  // Create FreeMemory object
  let freeMemory = new FreeMemory(app);

  // Menu option
  let option = {
    label: 'FreeMemory',
    callback: memoryDoorhanger
  }

  // Doorhanger options
  function memoryDoorhanger() {
    let buttons = [
      {
        label: 'Garbage Collection',
        callback: function() {
          freeMemory.gc();
        }
      },
      {
        label: 'Cycle Collection',
        callback: function() {
          freeMemory.cc();
        }
      },
      {
        label: 'Memory Minimize',
        callback: function() {
          freeMemory.mm();
        }
      },
      {
        label: 'about:memory',
        callback: function() {
          tabs.open('about:memory');
        }
      }
    ];

    let optns = {
      msg: 'Free Memory options',
      val: 'free-memory',
      buttons: buttons,
      options: {
        persistence: 1
      }
    }

    nw.showDoorhanger(optns);
  }

  nw.addMenu(option);

  let timer = new Timer(app);
}

exports.Mobile = Mobile;
