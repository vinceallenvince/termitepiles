var BitShadowMachine = require('bitshadowmachine');
var ColorPalette = require('colorpalette');
var rand = require('drawing-utils-lib').getRandomNumber;
var Utils = require('../src/utils');
var Vector = require('vector2d-lib');

/**
 * Creates a new Workspace.
 *
 * A Workspace manages the Bit-Shadow Machine system.
 * @constructor
 */
function Workspace() {
  this.paletteTermite = new ColorPalette();
  this.paletteFood = new ColorPalette();
  this.initialWoodchipLocs = [];
}

/**
 * Initializes a Workspace instance.
 * @param {Object} params A map of properties.
 */
Workspace.prototype.init = function(params) {

  var expected = {
    totalWoodChips: 'number',
    totalTermites: 'number',
    sensorLength: 'number',
    workspaceWidth: 'number',
    workspaceHeight: 'number'
  };

  Utils.checkExpectedProps(expected, params);

  this.totalWoodChips = params.totalWoodChips;
  this.totalTermites = params.totalTermites;
  this.sensorLength = params.sensorLength;
  this.workspaceWidth = params.workspaceWidth;
  this.workspaceHeight = params.workspaceHeight;

  this.initialWoodchipSeparation = params.initialWoodchipSeparation || 6;
};

Workspace.prototype.createSystem = function() {

  for (var i = 0; i < this.totalWoodChips; i++) {
    var loc = this.getLocation();
    //createWoodchips(loc.x, loc.y, i);
  }
};

/**
 * Returns a vector representing a location within the workspace bounds
 * that is not within a set distance to any other Woodchip. If all available
 * locations have been occupied, we drop the distance restriction.
 * @returns {Object} A vector.
 */
Workspace.prototype.getLocation = function() {
  var flag = false;
  var locs = this.initialWoodchipLocs;
  var i = 0;
  while (!flag) {
    var vec = this.getRandomVector();
    if ((!this.inVecArray(vec, locs, this.initialWoodchipSeparation) &&
          i < this.totalWoodChips) || i >= this.totalWoodChips) {
      flag = true;
      locs.push(vec);
      return vec;
    }
    i++;
  }
};

/**
 * Generates a random vector within the Workspace bounds.
 * @returns {Object} A vector.
 */
Workspace.prototype.getRandomVector = function() {
  return new Vector(rand(0, this.workspaceWidth), rand(0, this.workspaceHeight));
};

/**
 * Iterates over the passed array of vectors and checks if the
 * passed vector is within the passed distance.
 * @param {Object} vec      A vector.
 * @param {Object} arr      An array.
 * @param {number} distance A distance in pixels.
 * @returns {Boolean} True if the passed vector is within the passed
 *     distance of any vector in the passed array.
 */
Workspace.prototype.inVecArray = function(vec, arr, distance) {
  var check = false;
  for (var i = 0, max = arr.length; i < max; i++) {
    if (Vector.VectorDistance(vec, arr[i]) < distance) {
      check = true;
      break;
    }
  }
  return check;
}

/**
 * Creates color palettes.
 */
Workspace.prototype.createColorPalettes = function() {

  this.paletteTermite.addColor({
    min: 8,
    max: 24,
    startColor: [219, 203, 154],
    endColor: [157, 135, 68]
  });

  this.paletteFood.addColor({
    min: 8,
    max: 24,
    startColor: [196, 193, 166],
    endColor: [166, 163, 136]
  }).addColor({
    min: 8,
    max: 24,
    startColor: [167, 144, 86],
    endColor: [137, 114, 56]
  }).addColor({
    min: 8,
    max: 24,
    startColor: [171, 106, 46],
    endColor: [141, 76, 16]
  }).addColor({
    min: 8,
    max: 24,
    startColor: [137, 83, 32],
    endColor: [107, 53, 2]
  }).addColor({
    min: 8,
    max: 24,
    startColor: [189, 196, 155],
    endColor: [159, 166, 125]
  });
};

module.exports = Workspace;
