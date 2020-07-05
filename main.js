const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, Menu, ipcMain, BrowserWindow } = electron;

//create the twilio client
const client = require('twilio')('', '')//Private ID and KEY
let mainWindow;

app.on("ready", function () {
    mainWindow = new BrowserWindow({
        width: 550,
        height: 700,
        resizable: false,
        webPreferences: { nodeIntegration: true }

    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "html", "index.html"),
        protocol: 'file:',
        slashes: true
    }));
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
 //Insert Menu
 Menu.setApplicationMenu(mainMenu);
});

ipcMain.on("item:number", function (e, number) {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "html", "index.html"),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send("item:number", number);
    });
<<<<<<< HEAD
});
//Takes in number and sends sms from twilio
ipcMain.on("addNum", function (e, number){
    client.messages.create({
        to:'+1'+number,
        from:'+12056511702',
        body:'Hello World'
    })
    .then((message)=> console.log(message.sid));
});
||||||| merged common ancestors
});
=======
});
const mainMenuTemplate = [
    {
        label: 'Electron'
    }
   ,
    {
        label:'File',
        submenu: [
            {
                label:'Add item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear items',
                click(){
                    mainWindow.webContents.send('item: clear');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
        
    }
];
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I':
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}
>>>>>>> d58a4a92951ce5bf6a01bfe79dc20533442092c6
