import React from "react";
import { MangaEntryList } from "../helpers/mangaList";
import MangaEntryElement from "./MangaEntry";

type MangaListProps = {
  mangaList: MangaEntryList;
  deleteManga: (arg0: number) => void;
  editManga: (arg0: number) => void;
};

function MangaList(props: MangaListProps): JSX.Element {
  const mangaEntryElements: Array<JSX.Element> = [];
  for (const mangaId in props.mangaList.entries) {
    const manga = props.mangaList.entries[mangaId];
    mangaEntryElements.push(
      <MangaEntryElement
        mangaEntry={manga}
        key={mangaId}
        deleteManga={() => props.deleteManga(parseInt(mangaId))}
        editManga={() => props.editManga(parseInt(mangaId))}
      />
    );
  }

  return (
    <div className="MangaList">
      <h2>mangalist</h2>
      {mangaEntryElements}
    </div>
  );
}

export default MangaList;
