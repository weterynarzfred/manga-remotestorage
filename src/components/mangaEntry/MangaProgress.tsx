import getProp from "../../helpers/getProp";
import { MangaEntryContext } from "../MangaList";
import { useContext } from "react";

function getDaysAgo(timestamp: number) {
  const diff = new Date().getTime() - timestamp;
  return Math.round(diff / 1000 / 60 / 60 / 24);
}

function MangaProgress(): JSX.Element {
  const entry = useContext(MangaEntryContext);

  function increment(increment: number) {
    entry.manga.props.read = read + increment;
    entry.updateManga(entry.manga);
  }

  const unread = getProp(entry.manga, "unread");
  const read = getProp(entry.manga, "read");
  const ready = getProp(entry.manga, "ready");
  const lastUpdate = getProp(entry.manga, "lastUpdate");

  let unreadElement = <></>;
  let incrementElement = <></>;

  if (unread === 0) {
    unreadElement = <div className="manga-entry-read-status">read</div>;
  } else {
    unreadElement = (
      <>
        <div className="manga-entry-ready">/ {ready}</div>
        <div className="manga-entry-read-status">
          <div className="manga-entry-unread-count">{unread}</div>
          unread
        </div>
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
      <div className="manga-entry-timeago">
        {lastUpdate ? <>updated {getDaysAgo(lastUpdate)} days ago</> : null}
      </div>
    </div>
  );
}

export default MangaProgress;
