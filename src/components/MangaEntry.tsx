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
      <div className="manga-entry-title">{props.mangaEntry.props.title}</div>
      <div className="manga-entry-read">
        read: {props.mangaEntry.props.read}
      </div>
      <button onClick={props.checkManga}>check</button>
      <button onClick={props.editManga}>edit</button>
      <button onClick={props.deleteManga}>delete</button>
    </div>
  );
}

export default MangaEntryElement;
