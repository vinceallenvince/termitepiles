var Vector = require('vector2d-lib');
var Item = require('bitshadowmachine').Item;
var extend = require('drawing-utils-lib').extend;

/**
 * Creates a new Termite.
 *
 * @constructor
 * @extends Item
 */
function Termite() {
  Item.call(this);
}
extend(Termite, Item);

/**
 * Initializes an instance of Termite.
 *
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {Array} [opt_options.color = 200, 200, 200] Color.
 */
Termite.prototype.init = function(world, opt_options) {
  if (!world) throw new Error('Termite.init requires "world" argument.');

}

module.exports = Termite;