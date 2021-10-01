import _ from "lodash";
import checkManga from "./checkManga";
import { MangaEntry, MangaEntryList } from "./constants";

async function checkMangaList(
  mangaList: MangaEntryList,
  updateManga: (arg0: MangaEntry) => void
): Promise<void> {
  for (const mangaId in mangaList.entries) {
    const manga = mangaList.entries[mangaId];
    _.set(manga, "temp.isChecking", true);
    setTimeout(() => updateManga(manga), 0);
  }
  for (const mangaId in mangaList.entries) {
    const manga = mangaList.entries[mangaId];
    await checkManga(manga, updateManga);
  }
}

export default checkMangaList;
