const notifications = require("sdk/notifications");
const data = require("sdk/self").data;

const ICON = "freeMemory.png";

/**
 * Create notifications with the passed message.
 * @param {String} message
 *    String that is to be shown in the notification.
 */
function notify(message) {
  notifications.notify({
    text: message,
    iconURL: data.url(ICON)
  });
}
exports.notify = notify;
