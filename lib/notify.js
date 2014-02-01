const notifications = require("sdk/notifications");
const data = require("sdk/self").data;
const sp = require("sdk/simple-prefs");

const ICON = "freeMemory.png";

/**
 * Create notifications with the passed message.
 * @param {String} message
 *    String that is to be shown in the notification.
 */
function notify(message) {
  // If notification is disabled, return.
  if (!sp.prefs["notify"]) {
    return;
  }

  notifications.notify({
    text: message,
    iconURL: data.url(ICON)
  });
}
exports.notify = notify;
