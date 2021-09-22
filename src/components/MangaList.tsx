import React from "react";
import { MangaEntryList } from "./App";

type MangaListProps = {
  mangaList: MangaEntryList;
};

function MangaList(props: MangaListProps) :JSX.Element {
  const mangaEntryElements : Array<JSX.Element> = [];
  for (const mangaId in props.mangaList.entries) {
    const manga = props.mangaList.entries[mangaId];
    mangaEntryElements.push(<div className="manga-entry" key={mangaId}>
      <div className="manga-entry-title">{manga.title}</div>
    </div>);
  }

  return <div className="MangaList">
    <h2>mangalist</h2>
    {mangaEntryElements}
  </div>
}

export default MangaList;