// Magical constants.
const GC = "GC";
const CC = "CC";
const MM = "MM";

const COMPLETED = "completed";
const CLICKED = "clicked";
const OPEN = "open";
const HELP = "HELP";

const ABOUTMEMORY = "about:memory";
const ABOUTADDONSMEMORY = "about:addons-memory";
const INSTALLAAM = 'install aam';

/**
 * Define onclick events on all the divs and
 * emit proper magic constants.
 */
var gc_div = document.getElementById("gc");
gc_div.onclick = function() {
  addon.port.emit(GC);
}

var cc_div = document.getElementById("cc");
cc_div.onclick = function() {
  addon.port.emit(CC);
}

var mm_div = document.getElementById("mm");
mm_div.onclick = function() {
  addon.port.emit(MM);
}

var about_div = document.getElementById("aboutmemory");
about_div.onclick = function() {
  addon.port.emit(CLICKED);
  addon.port.emit(ABOUTMEMORY);
}

var aam_div = document.getElementById("aboutAddonsMemory");
// When AAM is found installed.
addon.port.on('AAM', function() {
  aam_div.textContent = 'about:addons-memory';
  // Show in the usual color.
  aam_div.style.color = '#9AA9C8';
  aam_div.onclick = function() {
    addon.port.emit(CLICKED);
    addon.port.emit(ABOUTADDONSMEMORY);
  }
});

// When AAM is disabled.
addon.port.on('AAMdisabled', function() {
  aam_div.textContent = 'about:addons-memory is disabled';
  // Show in red
  aam_div.style.color = 'red';
  aam_div.onclick = function() {
    addon.port.emit(CLICK);
    addon.port.emit(ABOUTADDONSMEMORY);
  }
});

// When AAM is not found.
addon.port.on('noAAM', function() {
  aam_div.textContent = 'Install about:addons-memory';
  // Show in red
  aam_div.style.color = 'red';
  aam_div.onclick = function() {
    addon.port.emit(CLICKED);
    addon.port.emit(INSTALLAAM);
  }
});

var help_div = document.getElementById("help");
help_div.onclick = function() {
  addon.port.emit(CLICKED);
  addon.port.emit(HELP);
}

addon.port.on(OPEN, function() {
  var opt = document.getElementById("gc");
  opt.focus();
});
