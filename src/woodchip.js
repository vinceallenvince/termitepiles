var BitShadowMachine = require('bitshadowmachine');
var utils = require('drawing-utils-lib');

/**
 * Creates a new WoodChip.
 *
 * @constructor
 * @extends Item
 */
function WoodChip() {
  //Item.call(this);
}
//Utils.extend(WoodChip, Item);

/**
 * Initializes an instance of WoodChip.
 *
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {Array} [opt_options.color = 200, 200, 200] Color.
 */
WoodChip.prototype.init = function(world, opt_options) {
  //WoodChip._superClass.init.call(this, world, opt_options);
  if (!world) throw new Error('WoodChip.init requires "world" argument.');

  var options = opt_options || {};

  this.name = options.name || 'WoodChip';
  this.color = options.color || [200, 200, 200];
  this.offsetDistance = typeof options.offsetDistance === 'undefined' ? -10 : options.offsetDistance;
  this.offsetAngle = options.offsetAngle || 0;
  this.beforeStep = options.beforeStep || null;

  this.offsetVector = new BitShadowMachine.Vector();
};

WoodChip.prototype.step = function() {

  if (this.beforeStep) this.beforeStep.call(this);

  if (this.parent) {
    if (this.offsetDistance) {
      var r = this.offsetDistance; // use angle to calculate x, y
      var theta = Utils.degreesToRadians(this.parent.angle + this.offsetAngle);
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);

      this.location.x = this.parent.location.x;
      this.location.y = this.parent.location.y;
      this.offsetVector.x = x;
      this.offsetVector.y = y;
      this.location.add(this.offsetVector); // position the child
    } else {
      this.location.x = this.parent.location.x;
      this.location.y = this.parent.location.y;
    }
  }
};

module.exports = WoodChip;
