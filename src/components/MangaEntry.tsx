import getProp from "../helpers/getProp";
import { MangaEntry } from "../helpers/mangaList";

type MangaEntryProps = {
  mangaEntry: MangaEntry;
  checkManga: () => void;
  editManga: () => void;
  deleteManga: () => void;
};

function MangaEntryElement(props: MangaEntryProps): JSX.Element {
  return (
    <div className="MangaEntry">
      <div className="manga-entry-title">
        {getProp(props.mangaEntry, "title")}
      </div>
      <div className="manga-entry-read">
        read: {getProp(props.mangaEntry, "read")} /{" "}
        {getProp(props.mangaEntry, "ready")}
      </div>
      <button onClick={props.checkManga}>check</button>
      <button onClick={props.editManga}>edit</button>
      <button onClick={props.deleteManga}>delete</button>
    </div>
  );
}

export default MangaEntryElement;
