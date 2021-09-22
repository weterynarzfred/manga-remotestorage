import React from "react";
import { MangaEntry } from "./App";

type MangaEntryProps = {
  mangaEntry: MangaEntry;
  deleteManga: () => void;
};

function MangaEntryElement(props: MangaEntryProps): JSX.Element {
  return (
    <div className="MangaEntry">
      <div className="manga-entry-title">{props.mangaEntry.title}</div>
      <div className="manga-entry-read">read: {props.mangaEntry.read}</div>
      <button onClick={props.deleteManga}>delete</button>
    </div>
  );
}

export default MangaEntryElement;
