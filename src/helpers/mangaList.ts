import { deepClone } from "./clone";
import { MangaPropSlug } from "./constants";

type MangaEntry = {
  [key in MangaPropSlug]?: string;
};

type MangaEntryList = {
  settings: {
    nextEntryId: number;
  };
  entries: {
    [key: string]: MangaEntry;
  };
};

const emptyMangaList: MangaEntryList = {
  settings: {
    nextEntryId: 1,
  },
  entries: {},
};

function updateManga(
  newManga: MangaEntry,
  mangaList: MangaEntryList,
  setMangaList: (arg0: MangaEntryList) => void
): void {
  const newMangaList = deepClone<MangaEntryList>(mangaList);
  if (newManga.id === "-1") {
    newManga.id = newMangaList.settings.nextEntryId.toString();
    newMangaList.settings.nextEntryId++;
  }
  if (newManga.id !== undefined) {
    newMangaList.entries[newManga.id] = newManga;
  }
  setMangaList(newMangaList);
}

function deleteManga(
  mangaId: number,
  mangaList: MangaEntryList,
  setMangaList: (arg0: MangaEntryList) => void
): void {
  const newMangaList = deepClone<MangaEntryList>(mangaList);

  delete newMangaList.entries[mangaId];
  setMangaList(newMangaList);
}

export type { MangaEntryList, MangaEntry };
export { emptyMangaList, updateManga, deleteManga };
