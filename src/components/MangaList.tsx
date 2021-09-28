import { MangaEntry, MangaEntryList } from "../helpers/constants";
import MangaEntryElement from "./MangaEntry";

type MangaListProps = {
  mangaList: MangaEntryList;
  checkManga: (arg0: MangaEntry) => void;
  editManga: (arg0: number) => void;
  deleteManga: (arg0: number) => void;
  updateManga: (arg0: MangaEntry) => void;
};

function MangaList(props: MangaListProps): JSX.Element {
  const mangaEntryElements: Array<JSX.Element> = [];
  for (const mangaId in props.mangaList.entries) {
    const manga = props.mangaList.entries[mangaId];
    mangaEntryElements.push(
      <MangaEntryElement
        mangaEntry={manga}
        key={mangaId}
        checkManga={() => props.checkManga(manga)}
        editManga={() => props.editManga(parseInt(mangaId))}
        updateManga={props.updateManga}
        deleteManga={() => props.deleteManga(parseInt(mangaId))}
      />
    );
  }

  return <div className="MangaList">{mangaEntryElements}</div>;
}

export default MangaList;
