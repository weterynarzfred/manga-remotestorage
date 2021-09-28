import { MangaEntry } from "../helpers/constants";
import getProp from "../helpers/getProp";

type MangaEntryProps = {
  mangaEntry: MangaEntry;
  checkManga: () => void;
  editManga: () => void;
  deleteManga: () => void;
};

function MangaEntryElement(props: MangaEntryProps): JSX.Element {
  const cover = getProp(props.mangaEntry, "cover");
  const coverElement =
    cover === "" ? (
      <></>
    ) : (
      <div className="manga-entry-cover-cake lazyload" data-bg={cover}></div>
    );

  return (
    <div className="MangaEntry">
      <div className="manga-entry-cover">{coverElement}</div>
      <div className="manga-entry-title">
        <small>[{getProp(props.mangaEntry, "status")}]</small>
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
