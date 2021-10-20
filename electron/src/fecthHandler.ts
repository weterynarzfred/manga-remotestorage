import { ipcMain } from "electron";
import fetch from "electron-fetch";

ipcMain.on("fetch", async (event, args) => {
  console.log("main fetch");
  const response = await fetch(args.url, args.options);
  const data = await response.text();
  event.reply("fetch-done", { id: args.id, data });
});
