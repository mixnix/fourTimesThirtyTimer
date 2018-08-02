const {app, BrowserWindow} = require('electron')
const url = require('url');

function boot(){
    win = new BrowserWindow({
        width: 700,
        height: 500
    });
    win.loadURL(`file://${__dirname}/index.html`)
    //load window from html
    // win.loadURL(url.format({
    //     pathname: 'index.html',
    //     slashes: true
    // }))
}



app.on('ready', boot)