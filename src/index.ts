import * as electron from 'electron';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('window-all-closed', () => {
    app.quit();
});

app.on('ready', () => {
    console.log(__dirname);
    mainWindow = new BrowserWindow();
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', () => mainWindow = null);
});