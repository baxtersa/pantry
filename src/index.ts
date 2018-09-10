import * as electron from 'electron';
import * as config from './config';

const { windowConfig } = config;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow: electron.BrowserWindow | null;

app.on('window-all-closed', () => {
    app.quit();
});

app.on('ready', () => {
    console.log(__dirname);

    const windowState = windowConfig.get();

    const options = windowState.size.fullscreen ?
        { fullscreen: true }
        : { ...windowState.position, ...windowState.size };

    mainWindow = new BrowserWindow({
        titleBarStyle: "hiddenInset",
        fullscreenable: true,
        ...options,
    });
    mainWindow.loadURL('file://' + __dirname + '/../public/index.html');
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.on('close', () => {
        windowConfig.recordState(mainWindow!);
    });
});
