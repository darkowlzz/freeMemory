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
