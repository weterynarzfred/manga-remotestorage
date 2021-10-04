import { MangaEntryList } from "./constants";

function deleteManga(
  mangaId: number,
  setMangaList: React.Dispatch<React.SetStateAction<MangaEntryList>>
): void {
  setMangaList((prevMangaList) => {
    const newMangaList = { ...prevMangaList };
    delete prevMangaList.entries[mangaId];
    return newMangaList;
  });
}

export default deleteManga;
