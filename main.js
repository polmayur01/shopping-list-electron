const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

//Set enviroment
process.env.NODE_ENV = "production";

//Listen for the app to be ready.
app.on("ready", function () {
  //Create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // <-- allow require() in HTML
      contextIsolation: false, // <-- same process context
    },
  });
  //Load HTML file into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "MainWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //Quite app when closed main window
  mainWindow.on("closed", function () {
    app.quit();
  });

  //Build menu template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //Insert menu
  Menu.setApplicationMenu(mainMenu);
});

//Handle create add window
function createAddWindow() {
  //Create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add Shopping List Item.",
    webPreferences: {
      nodeIntegration: true, // <-- allow require() in HTML
      contextIsolation: false, // <-- same process context
    },
  });
  //Load HTML file into window
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "AddWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //Garbage collection
  addWindow.on("close", function () {
    addWindow = null;
  });
}

ipcMain.on("item:add", function (e, data) {
  mainWindow.webContents.send("item:add", data);
  addWindow.close();
});

//Create menu templates
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        accelerator: process.platform === "darwin" ? "Command+N" : "Ctrl+N",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Item",
        click() {
          mainWindow.webContents.send("item:clear");
        },
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

//If mac then add empty object in menu
if (process.platform === "darwin") {
  mainMenuTemplate.unshift({});
}

//Add developer tool
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
