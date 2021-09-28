import { MangaEntryList } from "./constants";
async function storeData(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
