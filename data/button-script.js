var gc_button = document.getElementById("gc-button");
gc_button.onclick = function() {
  console.log("Clicked on GC!");
  self.port.emit("GC");
}

var cc_button = document.getElementById("cc-button");
cc_button.onclick = function() {
  console.log("Clicked on CC!");
  self.port.emit("CC");
}

var mm_button = document.getElementById("mm-button");
mm_button.onclick = function() {
  console.log("Clicked on MM!");
  self.port.emit("MM");
}
