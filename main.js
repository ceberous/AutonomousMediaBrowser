const electron = require('electron'); 
const app = electron.app; 
const BrowserWindow = electron.BrowserWindow; 
const nativeImage = electron.nativeImage;

let topWin;
function createTopWindow () {
  
  topWin = new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 700,
    minHeight: 400,
    //icon: './shieldIcon.png',
    title: 'Media Explorer',
    show: false,
    frame: true,
    //nodeIntegration: false,
  });

  topWin.loadURL(`file://${__dirname}/client/views/index.html`); // Points to the html file to load in the app
  //topWin.maximize(); // Starts as maximized as you can get!
  
  topWin.once('ready-to-show', () => {
    topWin.show();
    topWin.webContents.openDevTools();
  });

  topWin.on('closed', () => {
    topWin = null;
  });

}


//const icon = nativeImage.createFromPath('./shieldIcon.png');
app.setName('Media Explorer');
if (process.platform === 'darwin') {
  app.dock.setIcon(icon);
}

app.on('ready', () => {
  createTopWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (topWin === null) {
    createTopWindow();
  }
});