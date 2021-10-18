/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
require("./rt/electron-rt");
//////////////////////////////
// User Defined Preload scripts below
const electronFetch = require("electron-fetch");

(window as any).electronFetch = electronFetch;
console.log(window);
