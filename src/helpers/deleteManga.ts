import { deepClone } from "./clone";
import { MangaEntryList } from "./constants";

function deleteManga(
  mangaId: number,
  mangaList: MangaEntryList,
  setMangaList: (arg0: MangaEntryList) => void
): void {
  const newMangaList = deepClone<MangaEntryList>(mangaList);

  delete newMangaList.entries[mangaId];
  setMangaList(newMangaList);
}

export default deleteManga;
