var expect = require('expect.js');
var sinon = require('sinon');
var jsdom = require('jsdom');
var handlebars = require('handlebars');

var StartMenu = require('../src/startmenu');
var template = require('../src/templates/menu.hbs');

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

      menu.init({}, {
        labelTotalWoodChips: 'Red',
        labelTotalTermites: 'Green',
        labelSensorLength: 'Blue',
        labelStartButton: 'Yello'
      });
      expect(menu.labels.labelTotalWoodChips).to.be('Red');
      expect(menu.labels.labelTotalTermites).to.be('Green');
      expect(menu.labels.labelSensorLength).to.be('Blue');
      expect(menu.labels.labelStartButton).to.be('Yello');
    });
  });

  describe('Render', function() {

    it('should render a menu.', function() {
      var menu = new StartMenu();
      jsdom.env(
        "<body><script id='menu-template' type='text/x-handlebars-template'><label for='totalWoodChips'>{{labelTotalWoodChips}}</label><label for='totalTermites'>{{labelTotalTermites}}</label><label for='sensorLength'>{{labelSensorLength}}</label><label for='startButton'>{{labelStartButton}}</label></script></body>",
        [],
        function (errors, window) {
          var menu = new StartMenu();
          var body = window.document.querySelector('body');
          menu.init(body, {
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
        }
      );
    });
  });

});

