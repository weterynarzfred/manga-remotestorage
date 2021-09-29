import { useEffect, useState } from "react";
import classnames from "classnames";
import { MangaEntry } from "../helpers/constants";
import getProp from "../helpers/getProp";
import MangaScore from "./MangaScore";
import MangaProgress from "./MangaProgress";

type MangaEntryProps = {
  mangaEntry: MangaEntry;
  checkManga: () => void;
  editManga: () => void;
  deleteManga: () => void;
  updateManga: (arg0: MangaEntry) => void;
};

function MangaEntryElement(props: MangaEntryProps): JSX.Element {
  const [buttonsOpened, setButtonsOpened] = useState(false);

  const cover = getProp(props.mangaEntry, "cover");
  const coverElement =
    cover === "" ? (
      <div className="manga-entry-cover-cake"></div>
    ) : (
      <div className="manga-entry-cover-cake lazyload" data-bg={cover}></div>
    );

  function closeButtons() {
    document.removeEventListener("click", closeButtons);
    setButtonsOpened(false);
  }

  useEffect(
    () => () => document.removeEventListener("click", closeButtons),
    []
  );

  return (
    <div
      className={classnames("MangaEntry", {
        mangaUnread: getProp(props.mangaEntry, "unread") > 0,
      })}
    >
      <a
        className="manga-entry-cover"
        href={getProp(props.mangaEntry, "link")}
        target="_blank"
        rel="noreferrer"
      >
        {coverElement}
      </a>
      <div className="manga-entry-status">
        {getProp(props.mangaEntry, "status")}
      </div>
      <div
        className={classnames("manga-entry-buttons", { open: buttonsOpened })}
      >
        <button onClick={props.checkManga}>check</button>
        <button onClick={props.editManga}>edit</button>
        <button onClick={props.deleteManga}>delete</button>
      </div>
      <div
        className={classnames("manga-entry-more", { open: buttonsOpened })}
        onClick={(event) => {
          if (!buttonsOpened) {
            event.stopPropagation();
            document.addEventListener("click", closeButtons);
            setButtonsOpened(true);
          }
        }}
      ></div>
      <div className="manga-entry-info">
        <MangaScore
          mangaEntry={props.mangaEntry}
          updateManga={props.updateManga}
        />
        <MangaProgress
          mangaEntry={props.mangaEntry}
          updateManga={props.updateManga}
        />
        <a
          className="manga-entry-title"
          href={getProp(props.mangaEntry, "link")}
          target="_blank"
          rel="noreferrer"
        >
          {getProp(props.mangaEntry, "title")}
        </a>
      </div>
    </div>
  );
}

export default MangaEntryElement;
