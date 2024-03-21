// renderer.js
const { ipcRenderer, shell } = require("electron");
const path = require("path");

const apiKeyInput = document.getElementById("apiKey");
const apiSecretInput = document.getElementById("apiSecret");
const appIdInput = document.getElementById("appId");
const inputDirInput = document.getElementById("inputDir");
const outputDirInput = document.getElementById("outputDir");
const obfuscateBtn = document.getElementById("obfuscateBtn");
const selectInputDirBtn = document.getElementById("selectInputDir");
const selectOutputDirBtn = document.getElementById("selectOutputDir");

// 저장된 데이터 불러오기
apiKeyInput.value = localStorage.getItem("apiKey") || "";
apiSecretInput.value = localStorage.getItem("apiSecret") || "";
appIdInput.value = localStorage.getItem("appId") || "";

obfuscateBtn.addEventListener("click", () => {
    const jscramblerConfig = {
        apiKey: apiKeyInput.value,
        apiSecret: apiSecretInput.value,
        appId: appIdInput.value,
        inputDir: inputDirInput.value,
        outputDir: outputDirInput.value,
    };

    // 데이터 저장
    localStorage.setItem("apiKey", apiKeyInput.value);
    localStorage.setItem("apiSecret", apiSecretInput.value);
    localStorage.setItem("appId", appIdInput.value);

    // 버튼 비활성화
    obfuscateBtn.disabled = true;
    selectInputDirBtn.disabled = true;
    selectOutputDirBtn.disabled = true;

    ipcRenderer.send("obfuscate", jscramblerConfig);
});

ipcRenderer.on("obfuscate-complete", (event, outputDir) => {
    alert("Obfuscation complete!");

    // 버튼 활성화
    obfuscateBtn.disabled = false;
    selectInputDirBtn.disabled = false;
    selectOutputDirBtn.disabled = false;

    // output 디렉토리 열기
    shell.openPath(outputDir);
});

ipcRenderer.on("obfuscate-error", (event, error) => {
    alert(`An error occurred: ${error}`);

    // 버튼 활성화
    obfuscateBtn.disabled = false;
    selectInputDirBtn.disabled = false;
    selectOutputDirBtn.disabled = false;
});

selectInputDirBtn.addEventListener("click", () => {
    ipcRenderer.send("select-input-directory");
});

selectOutputDirBtn.addEventListener("click", () => {
    ipcRenderer.send("select-output-directory");
});

ipcRenderer.on("input-directory-selected", (event, path) => {
    inputDirInput.value = path;
});

ipcRenderer.on("output-directory-selected", (event, path) => {
    outputDirInput.value = path;
});
