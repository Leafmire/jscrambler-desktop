// main.js
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const jscrambler = require("jscrambler").default;

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
    mainWindow.removeMenu();

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

ipcMain.on("obfuscate", async (event, jscramblerConfig) => {
    console.log("Start obfuscating the JS files...");

    try {
        console.log(`Input Directory: ${jscramblerConfig.inputDir}`);
        console.log(`Output Directory: ${jscramblerConfig.outputDir}`);
        const inputDir = jscramblerConfig.inputDir.replace(/\\/g, "/");
        const outputDir = jscramblerConfig.outputDir.replace(/\\/g, "/");

        await jscrambler.protectAndDownload({
            keys: {
                accessKey: jscramblerConfig.apiKey,
                secretKey: jscramblerConfig.apiSecret,
            },
            applicationId: jscramblerConfig.appId,
            host: "api4.jscrambler.com",
            port: 443,
            filesDest: outputDir,
            filesSrc: [`${inputDir}/**/*.js`],
            // Include any other JScrambler protection parameters here
            // Example: params: [...]
        });
        console.log("Obfuscation complete");
        event.reply("obfuscate-complete", jscramblerConfig.outputDir);
    } catch (error) {
        console.error(`Obfuscation error: ${error.message}`);
        event.reply("obfuscate-error", error.message);
    }
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
