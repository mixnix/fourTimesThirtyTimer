const {app, BrowserWindow, globalShortcut} = require('electron')

function boot(){
    win = new BrowserWindow({
        width: 700,
        height: 500,
        frame: false,
        resizable: false
    });
    win.loadURL(`file://${__dirname}/app/html/index.html`)

    globalShortcut.register('ctrl+shift+alt+end', function () {
        win.webContents.send('global-shortcut', 0);
    });
}
    //todo: laduj bootstrapa lokanie a nie z internetu
    //todo: trzeba zrobic to zeby dalo sie przesuwac aplikacje

app.on('ready', boot)