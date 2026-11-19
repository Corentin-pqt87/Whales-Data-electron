// oxlint-disable eslint-plugin-unicorn/no-empty-file
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

// preload des fichiers de sauvegarde
contextBridge.exposeInMainWorld('api', {
    createSave: (data) => ipcRenderer.invoke('db:create-secondary', data)
});