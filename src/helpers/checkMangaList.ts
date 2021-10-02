import _ from "lodash";
import checkManga, { willMangaGetChecked } from "./checkManga";
import { MangaEntry, MangaEntryList } from "./constants";

async function checkMangaList(
  mangaList: MangaEntryList,
  updateManga: (arg0: MangaEntry) => void
): Promise<void> {
  for (const mangaId in mangaList.entries) {
    const manga = mangaList.entries[mangaId];
    if (willMangaGetChecked(manga)) {
      _.set(manga, "temp.isChecking", true);
      setTimeout(() => updateManga(manga), 0);
    }
  }
  for (const mangaId in mangaList.entries) {
    const manga = mangaList.entries[mangaId];
    if (manga.temp?.isChecking) await checkManga(manga, updateManga);
  }
}

export default checkMangaList;
