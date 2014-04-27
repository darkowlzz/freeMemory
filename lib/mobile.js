let nw = require('nativewindow');
const { FreeMemory } = require('freememory');

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
}

exports.Mobile = Mobile;
