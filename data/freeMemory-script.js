// Magical constants.
const COMPLETED = "completed";

const GC = "GC";
const CC = "CC";
const MM = "MM";
const CLICKED = "clicked";

const aboutMemory = "about:memory";

/**
 * Define onclick events on all the divs and
 * emit proper magic constants.
 */
var gc_div = document.getElementById("gc");
gc_div.onclick = function() {
  self.port.emit(GC);
}

var cc_div = document.getElementById("cc");
cc_div.onclick = function() {
  self.port.emit(CC);
}

var mm_div = document.getElementById("mm");
mm_div.onclick = function() {
  self.port.emit(MM);
}

var about_div = document.getElementById("aboutmemory");
about_div.onclick = function() {
  self.port.emit(CLICKED);
  window.open(aboutMemory);
}

self.port.on("open", function() {
  var foc = document.getElementById("gc");
  foc.focus();
});
