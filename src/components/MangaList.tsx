import { createContext } from "react";
import { MangaEntry, MangaEntryList } from "../helpers/constants";
import getSearchCoeff from "../helpers/getSearchCoeff";
import sortEntries from "../helpers/sortEntries";
import MangaEntryElement from "./MangaEntry";

type MangaListProps = {
  mangaList: MangaEntryList;
  checkManga: (arg0: MangaEntry) => void;
  editManga: (arg0: number) => void;
  deleteManga: (arg0: number) => void;
  updateManga: (arg0: MangaEntry) => void;
  filters: {
    search: string;
    setSearch: (arg0: string) => void;
  };
};

const MangaEntryContext = createContext(
  {} as {
    manga: MangaEntry;
    checkManga: () => void;
    editManga: () => void;
    deleteManga: () => void;
    updateManga: (arg0: MangaEntry) => void;
  }
);

function MangaList(props: MangaListProps): JSX.Element {
  const mangaEntryElements = [] as {
    element: JSX.Element;
    manga: MangaEntry;
    searchCoeff: number;
  }[];

  for (const mangaId in props.mangaList.entries) {
    const manga = props.mangaList.entries[mangaId];
    const searchCoeff = getSearchCoeff(props.filters.search, manga);
    if (searchCoeff < 0.03) continue;

    mangaEntryElements.push({
      element: (
        <MangaEntryContext.Provider
          value={{
            manga,
            checkManga: () => props.checkManga(manga),
            editManga: () => props.editManga(parseInt(mangaId)),
            updateManga: props.updateManga,
            deleteManga: () => props.deleteManga(parseInt(mangaId)),
          }}
          key={manga.id}
        >
          <MangaEntryElement />
        </MangaEntryContext.Provider>
      ),
      manga,
      searchCoeff,
    });
  }

  mangaEntryElements.sort(sortEntries);

  return (
    <div className="MangaList">
      {mangaEntryElements.map((obj) => obj.element)}
    </div>
  );
}

export default MangaList;
export { MangaEntryContext };
