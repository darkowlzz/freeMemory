/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const widgets = require("sdk/widget");
const data = require("sdk/self").data;

const ICON = "freeMemory.png";

/**
 * Create a widget and bind the passed panel.
 * @param {Object} pan
 *    Panel that is to be binded to the widget.
 * @return {Object} widget
 *    Widget object with binded panel.
 */
function createWidget(pan) {
  widget = widgets.Widget({
    id: "freeMemory",
    label: "Free Memory",
    contentURL: data.url(ICON),
    panel: pan
  });

  return widget;
}
exports.createWidget = createWidget;
