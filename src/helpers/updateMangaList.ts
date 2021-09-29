import { deepClone } from "./deepClone";
import { MangaEntry, MangaEntryList } from "./constants";
import checkManga from "./checkManga";

function updateMangaList(
  newManga: MangaEntry,
  mangaList: MangaEntryList,
  updateManga: (arg0: MangaEntry) => void
): MangaEntryList {
  console.log(mangaList.settings.nextEntryId);

  const newMangaList = deepClone(mangaList);
  if (newManga.id === -1) {
    console.log("add manga");

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
