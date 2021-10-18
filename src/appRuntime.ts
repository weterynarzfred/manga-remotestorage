// import fetch from "electron-fetch";
// eslint-disable-next-line @typescript-eslint/no-explicit-any

console.log(window);

export const electronFetch = (window as any).electronFetch;
