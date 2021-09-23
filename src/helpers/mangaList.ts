import { deepClone } from "./clone";
import { MangaPropSlug } from "./constants";

type MangaProps = {
  [key in MangaPropSlug]?: string;
};

type MangaEntry = {
  id: number;
  props: MangaProps;
};

type MangaEntryList = {
  settings: {
    nextEntryId: number;
  };
  entries: {
    [key: string]: MangaEntry;
  };
};

const defaultMangaList: MangaEntryList = {
  settings: {
    nextEntryId: 1,
  },
  entries: {},
};

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

function deleteManga(
  mangaId: number,
  mangaList: MangaEntryList,
  setMangaList: (arg0: MangaEntryList) => void
): void {
  const newMangaList = deepClone<MangaEntryList>(mangaList);

  delete newMangaList.entries[mangaId];
  setMangaList(newMangaList);
}

export type { MangaEntryList, MangaEntry, MangaProps };
export { defaultMangaList, updateMangaList, deleteManga };
