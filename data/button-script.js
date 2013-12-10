var message = document.getElementById("message");

var gc_button = document.getElementById("gc-button");

function clearMessage() {
  message.innerHTML = "";
}

gc_button.onclick = function() {
  console.log("Clicked on GC!");
  self.port.emit("GC");
  self.port.on("GC!", function() {
    message.innerHTML = "Garbage collection completed";
  });
  window.setTimeout(clearMessage, 2000);
}

var cc_button = document.getElementById("cc-button");
cc_button.onclick = function() {
  console.log("Clicked on CC!");
  self.port.emit("CC");
  self.port.on("CC!", function() {
    message.innerHTML = "Cycle collection completed";
  });
  window.setTimeout(clearMessage, 2000);
}

var mm_button = document.getElementById("mm-button");
mm_button.onclick = function() {
  console.log("Clicked on MM!");
  self.port.emit("MM");
  self.port.on("MM!", function() {
    message.innerHTML = "Memory minimization completed";
  });
  window.setTimeout(clearMessage, 2000);
}
