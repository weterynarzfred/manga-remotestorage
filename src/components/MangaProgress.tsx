import { MangaEntry } from "../helpers/constants";
import getProp from "../helpers/getProp";

type MangaProgressProps = {
  mangaEntry: MangaEntry;
};

function MangaProgress(props: MangaProgressProps): JSX.Element {
  const unread = getProp(props.mangaEntry, "unread");
  const read = getProp(props.mangaEntry, "read");
  const ready = getProp(props.mangaEntry, "ready");

  if (unread === 0) {
    return (
      <div className="manga-entry-progress">
        <div className="manga-entry-read">{read}</div>
        <div className="manga-entry-read-status">read</div>
      </div>
    );
  }

  return (
    <div className="manga-entry-progress">
      <div className="manga-entry-read">{read}</div>
      <div className="manga-entry-ready">/ {ready}</div>
      <div className="manga-entry-read-status">{unread} unread</div>
    </div>
  );
}

export default MangaProgress;
