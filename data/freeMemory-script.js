// Magical constants.
const GC = "GC";
const CC = "CC";
const MM = "MM";

const COMPLETED = "completed";
const CLICKED = "clicked";
const OPEN = "open";
const HELP = "HELP";

const ABOUTMEMORY = "about:memory";

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
  //window.open(aboutMemory);
}

var help_div = document.getElementById("help");
help_div.onclick = function() {
  addon.port.emit(CLICKED);
  addon.port.emit(HELP);
}

addon.port.on(OPEN, function() {
  var opt = document.getElementById("gc");
  opt.focus();
});
