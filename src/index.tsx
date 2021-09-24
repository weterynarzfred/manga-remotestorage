/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import RemoteStorage from "remotestoragejs";

const Widget = require("remotestorage-widget");

const remoteStorage = new RemoteStorage();
const widget = new Widget(remoteStorage);
remoteStorage.access.claim("manga-curl", "rw");
remoteStorage.caching.enable("/manga-curl/");
const storage = remoteStorage.scope("/manga-curl/");
widget.attach("widget");

const StorageContext = React.createContext(storage);

const context = require.context("./providers/", true, /.*\.ts/);
context.keys().forEach(context);

ReactDOM.render(
  <StorageContext.Provider value={storage}>
    <App />
  </StorageContext.Provider>,
  document.getElementById("root")
);

export { StorageContext };
