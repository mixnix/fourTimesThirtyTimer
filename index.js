const {app, BrowserWindow, globalShortcut} = require('electron')
const url = require('url');

function boot(){
    win = new BrowserWindow({
        width: 700,
        height: 500
    });
    win.loadURL(`file://${__dirname}/app/html/index.html`)

    globalShortcut.register('ctrl+shift+alt+end', function () {
        win.webContents.send('global-shortcut', 0);
    });


}



app.on('ready', boot)