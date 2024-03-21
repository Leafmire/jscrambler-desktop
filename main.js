// main.js
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const execSync = require("child_process").execSync;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile("index.html");

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('obfuscate', (event, jscramblerConfig) => {
    console.log('Start obfuscating the JS files...');
  
    try {
      console.log(`Input Directory: ${jscramblerConfig.inputDir}`);
      console.log(`Output Directory: ${jscramblerConfig.outputDir}`);
      const inputDir = (jscramblerConfig.inputDir).replace(/\\/g, "/");
      const outputDir = (jscramblerConfig.outputDir).replace(/\\/g, "/");
      execSync(
        `jscrambler -a ${jscramblerConfig.apiKey} -s ${jscramblerConfig.apiSecret} -i ${jscramblerConfig.appId} -o ${outputDir} ${inputDir}/*.js`
      );
    } catch (error) {
      console.error(`Obfuscation error: ${error.message}`);
    }
  
    console.log('Obfuscation complete');
    event.reply('obfuscate-complete', jscramblerConfig.outputDir);
  });

ipcMain.on("select-input-directory", async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
    });

    if (!result.canceled) {
        event.reply("input-directory-selected", result.filePaths[0]);
    }
});

ipcMain.on("select-output-directory", async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
    });

    if (!result.canceled) {
        event.reply("output-directory-selected", result.filePaths[0]);
    }
});
