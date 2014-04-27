const { data } = require("sdk/self");
const sp = require("sdk/simple-prefs");

const ICON = "freeMemory.png";

/**
 * Create notifications with the passed message.
 * @param {String} message
 *    String that is to be shown in the notification.
 * @param {String} app
 *    Name of the app, like 'Fennec', 'Firefox'.
 */
function notify(message, app) {
  // If notification is disabled, return.
  if (!sp.prefs["notify"]) {
    return;
  }

  // Depending upon the app, generate native notifications.
  if (app == 'Fennec') {
    let nw = require('nativewindow');
    let msg = {
      duration: 'long',
      message: message
    }
    nw.showToast(msg);
  }
  else {
    let notifications = require("sdk/notifications");
    notifications.notify({
      text: message,
      iconURL: data.url(ICON)
    });
  }
}
exports.notify = notify;
