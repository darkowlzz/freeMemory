/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

let { Cu } = require('chrome');
Cu.import('resource://gre/modules/Services.jsm');

const { data } = require("sdk/self");
const sp = require("sdk/simple-prefs");

const ICON = "freeMemory.png";

function getNativeWindow() {
  let window = Services.wm.getMostRecentWindow("navigator:browser");
  return window.NativeWindow;
}

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
    let nw = getNativeWindow();
    nw.toast.show(message, 'short');
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
