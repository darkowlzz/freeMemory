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

    let msg = 'Free Memory options';
    let options = {
      persistence: 1
    };

    let win = nw.getWin();
    win.NativeWindow.doorhanger.show(msg, 'free-Memory', buttons,
                                     win.BrowserApp.selectedTab.id, options);
  }

  nw.addMenu(option);

  let timer = new Timer(app);
}

exports.Mobile = Mobile;
