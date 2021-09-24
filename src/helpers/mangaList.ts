import { deepClone } from "./clone";
import { MangaPropSlug, ProviderPropSlug } from "./constants";
import { PROVIDERS } from "./providers";

type MangaProps = {
  [key in MangaPropSlug]?: string;
};

type ProviderProps = {
  [key in ProviderPropSlug]?: string;
};

type MangaEntry = {
  id: number;
  props: MangaProps;
  providers: {
    [key in keyof typeof PROVIDERS]?: ProviderProps;
  };
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
