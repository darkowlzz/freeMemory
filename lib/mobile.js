/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

let { Cu } = require('chrome');
Cu.import('resource://gre/modules/Services.jsm');

const { FreeMemory } = require('freememory');
const { Timer } = require('timer');
const tabs = require('sdk/tabs');

function getNativeWindow() {
  let window = Services.wm.getMostRecentWindow("navigator:browser");
  return window;
}

var menuID;

function Mobile(app) {
  // Create FreeMemory object
  let freeMemory = new FreeMemory(app);
  let nw = getNativeWindow().NativeWindow;

  // Menu option
  let option = {
    name: 'FreeMemory',
    icon: null,
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
      }
    ];

    let message = 'Free Memory options';
    let options = {
      persistence: 1
    }

    nw.doorhanger.show(message, 'free-memory', buttons,
                       getNativeWindow().BrowserApp.selectedTab.id,
                       options);
  }

  menuId = nw.menu.add(option);

  let timer = new Timer(app);
}

exports.Mobile = Mobile;
