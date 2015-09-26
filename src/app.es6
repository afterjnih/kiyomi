import app from "app";
import BrowserWindow from 'browser-window';
import Menu from 'menu';
import {Store} from './store/store';
import {ViewerActions} from './action/action';

require('crash-reporter').start();
var mainWindow = null;

app.on('window-al-closed', function(){
  if(process.platform != 'darwin'){
    app.quit();
  }
});

app.on('ready', function(){

  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({width: 900, height: 800});

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.openDevTools();

  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});

let template = [
  {},
  {
    label: 'View',
    submenu: [
      {label: 'Fit the Window', accelerator: 'Command+_', click: ()=> {
        mainWindow.webContents.send('fitPageToWindow');
        ViewerActions.fitPageToWindow();
        console.log('fit1111111111111111111');
      }}
    ]
  }
];

let menu = Menu.buildFromTemplate(template);
