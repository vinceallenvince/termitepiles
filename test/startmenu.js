var expect = require('expect.js');
var sinon = require('sinon');
var jsdom = require('jsdom');
var handlebars = require('handlebars');

var StartMenu = require('../src/startmenu');
var Workspace = require('../src/workspace');
var template = require('../src/templates/startmenu.hbs');

var utils = require('drawing-utils-lib');

describe('StartMenu', function() {

  describe('Basics', function() {

    it('should load.', function() {
      var menu = new StartMenu();
      expect(menu instanceof StartMenu).to.be(true);
    });
  });

  describe('Init', function() {

    it('should initialize.', function() {
      var menu = new StartMenu();

      // StartMenu.init requires a "container" argument.
      var fnA = function() {
        menu.init();
      }
      expect(fnA).to.throwError();

      menu.init({});
      expect(typeof menu.container).to.be('object');
      expect(typeof menu.labels).to.be('object');
      expect(menu.labels.labelTotalWoodChips).to.be('Total Wood Chips');
      expect(menu.labels.labelTotalTermites).to.be('Total Termites');
      expect(menu.labels.labelSensorLength).to.be('Sensor Length');
      expect(menu.labels.labelStartButton).to.be('Start');

      var fnB = function() {

      };
      //var spyFnB = sinon.spy(fnB); // TODO: spy on this function

      menu.init({}, fnB, {
        labelTotalWoodChips: 'Red',
        labelTotalTermites: 'Green',
        labelSensorLength: 'Blue',
        labelStartButton: 'Yello'
      });
      //expect(spyFnB.called).to.be(true);
      expect(menu.labels.labelTotalWoodChips).to.be('Red');
      expect(menu.labels.labelTotalTermites).to.be('Green');
      expect(menu.labels.labelSensorLength).to.be('Blue');
      expect(menu.labels.labelStartButton).to.be('Yello');
    });
  });

  describe('Render', function() {

    it('should render a menu.', function() {
      jsdom.env(
        "<body><script id='menu-template' type='text/x-handlebars-template'><label for='totalWoodChips'>{{labelTotalWoodChips}}</label><label for='totalTermites'>{{labelTotalTermites}}</label><label for='sensorLength'>{{labelSensorLength}}</label><label for='startButton'>{{labelStartButton}}</label></script></body>",
        [],
        function (errors, window) {
          var menu = new StartMenu();
          var stubAttachEvents = sinon.stub(menu, 'attachEvents');
          var body = window.document.querySelector('body');
          body.insertAdjacentHTML = function(position, content) {
            window.document.body.innerHTML = content;
          };
          menu.init(body, function() {}, {
            labelTotalWoodChips: 'Red',
            labelTotalTermites: 'Green',
            labelSensorLength: 'Blue',
            labelStartButton: 'Yellow'
          });
          var source = window.document.getElementById('menu-template');
          var template = handlebars.compile(source.innerHTML);
          menu.render(template);
          expect(body.querySelector('label[for=totalWoodChips]').textContent).to.be('Red');
          expect(body.querySelector('label[for=totalTermites]').textContent).to.be('Green');
          expect(body.querySelector('label[for=sensorLength]').textContent).to.be('Blue');
          expect(body.querySelector('label[for=startButton]').textContent).to.be('Yellow');
          expect(stubAttachEvents.calledOnce).to.be(true);
          menu.attachEvents.restore();
        }
      );
    });
  });

  describe('Attach events', function() {

    it('should attach events.', function() {

      jsdom.env(
        "<body><button id='startButton'>start</button></body>",
        [],
        function (errors, window) {

          var stubUtils = sinon.stub(utils, 'addEvent');

          var menu = new StartMenu();
          menu.callback = function() {};
          menu.container = window.document.body;
          menu.attachEvents();

          expect(stubUtils.called).to.be(true);
          utils.addEvent.restore();
        }
      );
    });

  });

  describe('handleStartButton', function() {
    return;
    it('should create and initialize a new start button.', function() {
      Workspace = sinon.spy(Workspace);
      var menu = new StartMenu();
      menu.handleStartButton();
      expect(Workspace.calledOnce).to.be(true);
    });
  });

  describe('getInputValue', function() {

    it('should get the value from a passed input field.', function() {
      var menu = new StartMenu();
      var fn = function() {
        menu.getInputValue();
      }
      expect(fn).to.throwError();

      jsdom.env(
        "<input type='text' id='totalWoodChips' value='100'>100</input>",
        [],
        function (errors, window) {
          var menu = new StartMenu();
          menu.container = window.document;
          var val = menu.getInputValue('totalWoodChips');
          expect(val).to.be(100);
        }
      );

    });
  });

});

