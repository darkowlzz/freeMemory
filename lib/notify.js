const notifications = require("sdk/notifications");
const data = require("sdk/self").data;

const ICON = "freeMemory.png";

// Create notifications with the passed message.
function notify(message) {
  notifications.notify({
    text: message,
    iconURL: data.url(ICON)
  });
}
exports.notify = notify;
