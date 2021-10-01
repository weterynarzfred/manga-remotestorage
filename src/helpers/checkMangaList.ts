import checkManga from "./checkManga";
import { MangaEntry, MangaEntryList } from "./constants";

async function checkMangaList(
  mangaList: MangaEntryList,
  updateManga: (arg0: MangaEntry) => void
): Promise<void> {
  for (const mangaId in mangaList.entries) {
    const manga = mangaList.entries[mangaId];
    checkManga(manga, updateManga);
  }
}

export default checkMangaList;
