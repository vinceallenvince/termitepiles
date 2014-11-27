var BitShadowMachine = require('bitshadowmachine');
var ColorPalette = require('colorpalette');
var Utils = require('../src/utils');

/**
 * Creates a new Workspace.
 *
 * A Workspace manages the Bit-Shadow Machine system.
 * @constructor
 */
function Workspace() {
  this.paletteTermite = new ColorPalette();
  this.paletteFood = new ColorPalette();
}

Workspace.prototype.init = function(params) {

  var expected = {
    totalWoodChips: 'number',
    totalTermites: 'number',
    sensorLength: 'number'
  };

  Utils.checkExpectedProps(expected, params);

  this.totalWoodChips = params.totalWoodChips;
  this.totalTermites = params.totalTermites;
  this.sensorLength = params.sensorLength;

};

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
