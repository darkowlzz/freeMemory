// Magical constants.
const COMPLETED = "completed";

const GC = "GC";
const CC = "CC";
const MM = "MM";

var message = document.getElementById("message");

/**
 * Define onclick events on all the buttons and
 * emit proper magic constants.
 */
var gc_button = document.getElementById("gc-button");
gc_button.onclick = function() {
  self.port.emit(GC);
}

var cc_button = document.getElementById("cc-button");
cc_button.onclick = function() {
  self.port.emit(CC);
}

var mm_button = document.getElementById("mm-button");
mm_button.onclick = function() {
  self.port.emit(MM);
}


// Clear the status message.
function clearMessage() {
  message.innerHTML = "";
}

// A timeout to clear the status message after 2sec.
self.port.on(COMPLETED, function(stat) {
  message.innerHTML = stat;
  window.setTimeout(clearMessage, 2000);
});
