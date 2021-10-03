/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import _ from "lodash";
import { MangaEntryList } from "./constants";
import { deepClone } from "./deepClone";
async function storeData(
  storage: any,
  mangaList: MangaEntryList
): Promise<void> {
  const mangaListToStore = deepClone(mangaList);
  for (const mangaId in mangaListToStore.entries) {
    const manga = mangaListToStore.entries[mangaId];
    manga.temp = {};
  }
  await storage.storeFile(
    "application/json",
    "mangalist.json",
    JSON.stringify(mangaListToStore)
  );

  // console.log(mangaListToStore);
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
    const data = JSON.parse(content.data);
    if (data.settings?.filters?.search === undefined) {
      _.set(data, "settings.filters.search", "");
    }
    if (data.settings?.filters?.advancedFilters?.unread === undefined) {
      _.set(data, "settings.filters.advancedFilters.unread", {
        active: false,
        isMore: true,
        value: 0,
      });
    }
    setMangaList(data);
  }
  setIsDataLoaded(true);
}

export { storeData, getStoredData };
