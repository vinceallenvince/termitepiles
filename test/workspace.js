var expect = require('expect.js');
var sinon = require('sinon');
var jsdom = require('jsdom');

var Workspace = require('../src/workspace');
var ColorPalette = require('colorpalette');

var params = {
  totalWoodChips: 3000,
  totalTermites: 30,
  sensorLength: 10
};

describe('Workspace', function() {

  describe('Basics', function() {

    it('should load.', function() {
      var workspace = new Workspace();
      expect(workspace instanceof Workspace).to.be(true);
    });
  });


  describe('Init', function() {

    it('should initialize.', function() {
      var workspace = new Workspace();
      workspace.init(params);
      expect(workspace.totalWoodChips).to.be(3000);
      expect(workspace.totalTermites).to.be(30);
      expect(workspace.sensorLength).to.be(10);
    });
  });


  describe('CreatePalettes', function() {

    var stub = sinon.stub(ColorPalette.prototype, 'addColor').returns(ColorPalette.prototype);

    it('should create and set color palettes.', function() {
      var workspace = new Workspace();
      workspace.createColorPalettes();
      expect(stub.callCount).to.be.greaterThan(2);
    });
  });

});
