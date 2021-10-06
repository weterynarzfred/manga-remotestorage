import { createContext } from "react";
import { MangaEntry, MangaEntryList } from "../helpers/constants";
import getSearchCoeff from "../helpers/getSearchCoeff";
import sortEntries from "../helpers/sortEntries";
import MangaEntryElement from "./mangaEntry/MangaEntry";
import "../scss/mangaList.scss";
import filterEntries from "../helpers/filterEntries";

type MangaListProps = {
  mangaList: MangaEntryList;
  checkManga: (arg0: MangaEntry) => void;
  editManga: (arg0: number) => void;
  deleteManga: (arg0: number) => void;
  updateManga: (arg0: MangaEntry) => void;
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
    const searchCoeff = getSearchCoeff(
      props.mangaList.settings.filters.search,
      manga
    );
    if (!filterEntries(manga, searchCoeff, props.mangaList.settings.filters))
      continue;

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
      <div className="MangaList-count">
        displaying: {mangaEntryElements.length} /{" "}
        {Object.keys(props.mangaList.entries).length}
      </div>
      <div className="MangaList-entries">
        {mangaEntryElements.map((obj) => obj.element)}
      </div>
    </div>
  );
}

export default MangaList;
export { MangaEntryContext };
