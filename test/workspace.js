var expect = require('expect.js');
var sinon = require('sinon');
var jsdom = require('jsdom');

var Workspace = require('../src/workspace');
var ColorPalette = require('colorpalette');
var Vector = require('vector2d-lib');

var params = {
  totalWoodChips: 3000,
  totalTermites: 30,
  sensorLength: 10,
  workspaceWidth: 960,
  workspaceHeight: 540
};

describe('Workspace', function() {

  describe('basics', function() {

    it('should load.', function() {
      var workspace = new Workspace();
      expect(workspace instanceof Workspace).to.be(true);
    });
  });


  describe('init', function() {

    it('should initialize.', function() {
      var workspace = new Workspace();
      workspace.init(params);
      expect(workspace.totalWoodChips).to.be(3000);
      expect(workspace.totalTermites).to.be(30);
      expect(workspace.sensorLength).to.be(10);
    });
  });


  describe('createPalettes', function() {

    var stub = sinon.stub(ColorPalette.prototype, 'addColor').returns(ColorPalette.prototype);

    it('should create and set color palettes.', function() {
      var workspace = new Workspace();
      workspace.createColorPalettes();
      expect(stub.callCount).to.be.greaterThan(2);
    });
  });

  describe('createSystem', function() {

    it('should create Woodchips.', function() {
      var workspace = new Workspace();
      var stub = sinon.stub(workspace, 'getLocation');
      workspace.init(params);
      workspace.createSystem();
      expect(stub.called).to.be(true);
    });
  });

  describe('getLocation', function() {

    it('should return a vector representing a location within the workspace bounds that is not within a set distance to any other Woodchip.', function() {
      var workspace = new Workspace();
      var stubGetRandomVector = sinon.stub(workspace, 'getRandomVector');
      stubGetRandomVector.returns(new Vector());
      var stubInVecArray = sinon.stub(workspace, 'inVecArray');
      stubInVecArray.returns(false);
      workspace.init(params);
      workspace.initialWoodchipSeparation = 10;
      var vec = workspace.getLocation();
      expect(vec instanceof Vector).to.be(true);
    });

    it('If all available locations have been occupied, we drop the distance restriction.', function() {
      var workspace = new Workspace();
      var stubGetRandomVector = sinon.stub(workspace, 'getRandomVector');
      stubGetRandomVector.returns(new Vector());
      var stubInVecArray = sinon.stub(workspace, 'inVecArray');
      stubInVecArray.returns(true);
      workspace.init(params);
      workspace.totalWoodChips = 10;
      var vec = workspace.getLocation();
      expect(vec instanceof Vector).to.be(true);
    });
  });

  describe('getRandomVector', function() {

    it('shoud generates a random vector within the Workspace bounds.', function() {
      var workspace = new Workspace();
      workspace.init(params);
      var vec = workspace.getRandomVector();
      expect(vec instanceof Vector).to.be(true);
      expect(vec.x > 0 && vec.x < workspace.workspaceWidth).to.be(true);
      expect(vec.y > 0 && vec.y < workspace.workspaceHeight).to.be(true);
    });
  });

  describe('inVecArray', function() {

    it('shoud iterate over the passed array of vectors and checks if the passed vector is within the passed distance.', function() {
      var workspace = new Workspace();
      workspace.init(params);
      var vec = new Vector(195, 195);
      var vecA = new Vector(100, 100);
      var vecB = new Vector(150, 150);
      var vecC = new Vector(200, 200);
      var check = workspace.inVecArray(vec, [vecA, vecB, vecC], 10);
      expect(check).to.be(true);
    });

    it('shoud return false if passed vector is within the passed distance of any vector in the passed array.', function() {
      var workspace = new Workspace();
      workspace.init(params);
      var vec = new Vector(195, 195);
      var vecA = new Vector(100, 100);
      var vecB = new Vector(150, 150);
      var vecC = new Vector(200, 200);
      var check = workspace.inVecArray(vec, [vecA, vecB, vecC], 20);
      expect(check).to.be(false);
    });
  });
});
