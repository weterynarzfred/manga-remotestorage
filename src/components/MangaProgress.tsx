import { deepClone } from "../helpers/clone";
import { MangaEntry } from "../helpers/constants";
import getProp from "../helpers/getProp";

type MangaProgressProps = {
  mangaEntry: MangaEntry;
  updateManga: (arg0: MangaEntry) => void;
};

function MangaProgress(props: MangaProgressProps): JSX.Element {
  function increment(increment: number) {
    const newMangaEntry = deepClone(props.mangaEntry);
    newMangaEntry.props.read = read + increment;
    props.updateManga(newMangaEntry);
  }

  const unread = getProp(props.mangaEntry, "unread");
  const read = getProp(props.mangaEntry, "read");
  const ready = getProp(props.mangaEntry, "ready");

  let unreadElement = (<></>) as JSX.Element;
  let incrementElement = (<></>) as JSX.Element;

  if (unread === 0) {
    unreadElement = <div className="manga-entry-read-status">read</div>;
  } else {
    unreadElement = (
      <>
        <div className="manga-entry-ready">/ {ready}</div>
        <div className="manga-entry-read-status">{unread} unread</div>
      </>
    );
    incrementElement = (
      <div className="manga-entry-increment">
        {unread >= 1 ? (
          <div
            className="manga-entry-increment-button"
            onClick={() => increment(1)}
          >
            + 1
          </div>
        ) : null}
        {unread !== 1 ? (
          <div
            className="manga-entry-increment-button"
            onClick={() => increment(unread)}
          >
            + {unread}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="manga-entry-progress">
      {incrementElement}
      <div className="manga-entry-read">{read}</div>
      {unreadElement}
    </div>
  );
}

export default MangaProgress;
