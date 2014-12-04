var expect = require('expect.js');
var sinon = require('sinon');
var jsdom = require('jsdom');

var Workspace = require('../src/workspace');
var ColorPalette = require('colorpalette');
var Vector = require('vector2d-lib');

var BitShadowMachine = require('bitshadowmachine');

var params = {
  totalWoodChips: 3000,
  totalTermites: 30,
  sensorLength: 10,
  workspaceWidth: 960,
  workspaceHeight: 540,
  workspaceResolution: 2,
  workspaceContainer: {},
  workspaceColor: [0, 0, 0],
  workspaceFriction: 0.1
};

describe('Workspace', function() {

  describe('basics', function() {

    it('should load.', function() {
      var workspace = new Workspace();
      expect(workspace instanceof Workspace).to.be(true);
      expect(workspace.paletteTermite instanceof ColorPalette).to.be(true);
      expect(workspace.paletteWoodchip instanceof ColorPalette).to.be(true);
      expect(workspace.initialWoodchipLocs.length).to.be(0);
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

    it('should call Bit-Shadow Machine System setup and pass a callback.', function() {
      var workspace = new Workspace();
      var stubBSMSetup = sinon.stub(BitShadowMachine.System, 'setup');
      workspace.init(params);
      workspace.createSystem();
      expect(stubBSMSetup.called).to.be(true);
      BitShadowMachine.System.setup.restore();
    });
  });

  describe('setupHandler', function() {

    it('should create a world and Woodchips', function() {

      var stubBSMAdd = sinon.stub(BitShadowMachine.System, 'add');

      var workspace = new Workspace();
      var stubGetLocation = sinon.stub(workspace, 'getLocation');
      var stubCreateWoodchips = sinon.stub(workspace, 'createWoodchips');

      params.totalWoodChips = 3;
      workspace.init(params);
      workspace.setupHandler();

      expect(stubBSMAdd.called).to.be(true);
      expect(stubGetLocation.calledThrice).to.be(true);
      expect(stubCreateWoodchips.calledThrice).to.be(true);

      BitShadowMachine.System.add.restore();
      workspace.getLocation.restore();
      workspace.createWoodchips.restore();
    });
  });

  describe('createWoodchips', function() {

    it('should create BitShadowMachine records representing Woodchips.', function() {
      var stubBSM = sinon.stub(BitShadowMachine.System, 'add');
      stubBSM.returns({});
      var vec = new Vector(10, 10);
      var workspace = new Workspace();
      var stubColorPalette = sinon.stub(workspace.paletteWoodchip, 'getColor');
      workspace.init(params);
      workspace.createWoodchips(vec, 10);

      expect(stubBSM.called).to.be(true);
      expect(stubColorPalette.called).to.be(true);
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
      var check = workspace.inVecArray(vec, [vecA, vecB, vecC], 2);
      expect(check).to.be(false);
    });
  });
});
