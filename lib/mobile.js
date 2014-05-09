let nw = require('nativewindow');
const { FreeMemory } = require('freememory');
const { Timer } = require('timer');

function Mobile(app) {
  // Create FreeMemory object
  let freeMemory = new FreeMemory(app);

  function free() {
    freeMemory.mm();
  }

  // Menu option
  let option = {
    label: 'FreeMemory',
    callback: free
  }

  nw.addMenu(option);

  let timer = new Timer(app);
}

exports.Mobile = Mobile;
