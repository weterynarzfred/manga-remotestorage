/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
require("./rt/electron-rt");
//////////////////////////////
// User Defined Preload scripts below
// const electronFetch = require("electron-fetch").default;
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    console.log("send");
    ipcRenderer.send(channel, data);
  },
  subscribe: (channel, callback) => {
    console.log("subscribe");
    const listener = (_event, ...args) => {
      console.log("listener");
      return callback(...args);
    };
    ipcRenderer.on(channel, listener);
    return () => {
      console.log("unsubscribe");
      ipcRenderer.removeListener(channel, listener);
    };
  },
});

// (window as any).electronFetch = electronFetch;
// (window as any).ipcRenderer = ipcRenderer;
// console.log(window);
