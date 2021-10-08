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

const remoteStorage = new RemoteStorage();
remoteStorage.setCordovaRedirectUri("https://isitoutyet.netlify.app/");
const widget = new Widget(remoteStorage);
remoteStorage.access.claim("manga-curl", "rw");
remoteStorage.caching.enable("/manga-curl/");
const storage = remoteStorage.scope("/manga-curl/");
widget.attach("widget");

const StorageContext = createContext(storage);

const context = require.context("./providers/", true, /[^/]+\/index\.ts/);
context.keys().forEach(context);

ReactDOM.render(
  <StorageContext.Provider value={storage}>
    <App />
  </StorageContext.Provider>,
  document.getElementById("root")
);

export { StorageContext };
