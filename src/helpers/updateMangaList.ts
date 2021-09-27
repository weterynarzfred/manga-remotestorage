import { deepClone } from "./clone";
import { MangaEntry, MangaEntryList } from "./constants";

function updateMangaList(
  newManga: MangaEntry,
  mangaList: MangaEntryList
): MangaEntryList {
  const newMangaList = deepClone<MangaEntryList>(mangaList);
  if (newManga.id === -1) {
    newManga.id = newMangaList.settings.nextEntryId;
    newMangaList.settings.nextEntryId++;
  }
  if (newManga.id !== undefined) {
    newMangaList.entries[newManga.id] = newManga;
  }
  return newMangaList;
}

export default updateMangaList;
