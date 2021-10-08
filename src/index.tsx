/* eslint-disable @typescript-eslint/no-var-requires */
import { createContext } from "react";
import ReactDOM from "react-dom";
import "lazysizes";

import "./helpers/detectHover.ts";
import App from "./components/App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
document.addEventListener("lazybeforeunveil", (event: any) => {
  if (event.target === null) return;
  const bg = event.target.getAttribute("data-bg");
  if (bg) event.target.style.backgroundImage = "url(" + bg + ")";
});

const RemoteStorage = require("remotestoragejs");
const Widget = require("remotestorage-widget");

const remoteStorage = new RemoteStorage({
  cordovaRedirectUri: "https://widok.studio",
});
const widget = new Widget(remoteStorage);
remoteStorage.access.claim("manga-curl", "rw");
remoteStorage.caching.enable("/manga-curl/");

const storage = {
  scope: remoteStorage.scope("/manga-curl/"),
  instance: remoteStorage,
};
widget.attach("widget");

const StorageContext = createContext(storage);

const context = require.context("./providers/", true, /[^/]+\/index\.ts/);
context.keys().forEach(context);

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalContext = window as unknown as { cordova: any };
  if (globalContext.cordova !== undefined) {
    window.open = globalContext.cordova.InAppBrowser.open;
  }
}

ReactDOM.render(
  <StorageContext.Provider value={storage}>
    <App />
  </StorageContext.Provider>,
  document.getElementById("root")
);

export { StorageContext };
