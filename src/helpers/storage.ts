/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { MangaEntryList } from "./constants";
async function storeData(
  storage: any,
  mangaList: MangaEntryList
): Promise<void> {
  await storage.storeFile(
    "application/json",
    "mangalist.json",
    JSON.stringify(mangaList)
  );
  console.log("storeData", mangaList);
}

async function getStoredData(
  storage: any,
  setMangaList: (arg0: MangaEntryList) => void,
  setIsDataLoaded: (arg0: boolean) => void
): Promise<void> {
  const content = (await storage.getFile("mangalist.json")) as {
    contentType: string;
    data: string;
  };

  if (content.data !== undefined) {
    setMangaList(JSON.parse(content.data));
  }
  setIsDataLoaded(true);
}

export { storeData, getStoredData };
