'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require("app");

var _app2 = _interopRequireDefault(_app);

var _browserWindow = require('browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

require('crash-reporter').start();
var mainWindow = null;

_app2['default'].on('window-al-closed', function () {
  if (process.platform != 'darwin') {
    _app2['default'].quit();
  }
});

_app2['default'].on('ready', function () {

  mainWindow = new _browserWindow2['default']({ width: 800, height: 600 });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
//# sourceMappingURL=index.js.map