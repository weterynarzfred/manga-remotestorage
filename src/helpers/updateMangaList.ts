import { deepClone } from "./deepClone";
import { MangaEntry, MangaEntryList } from "./constants";
import checkManga from "./checkManga";

function updateMangaList(
  newManga: MangaEntry,
  mangaList: MangaEntryList,
  updateManga: (arg0: MangaEntry) => void
): MangaEntryList {
  const newMangaList = deepClone(mangaList);
  if (newManga.id === -1) {
    newManga.id = newMangaList.settings.nextEntryId;
    newMangaList.settings.nextEntryId++;

    checkManga(newManga, updateManga);
  }
  if (newManga.id !== undefined) {
    newMangaList.entries[newManga.id] = newManga;
  }
  return newMangaList;
}

export default updateMangaList;
