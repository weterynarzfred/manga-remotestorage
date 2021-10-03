import classNames from "classnames";
import { useEffect, useState } from "react";
import { MangaEntry } from "../helpers/constants";

type MangaButtonsProps = {
  mangaEntry: MangaEntry;
  checkManga: () => void;
  editManga: () => void;
  deleteManga: () => void;
};

function MangaButtons(props: MangaButtonsProps): JSX.Element {
  const [buttonsOpened, setButtonsOpened] = useState(false);

  function closeButtons() {
    document.removeEventListener("click", closeButtons);
    setButtonsOpened(false);
  }

  useEffect(
    () => () => document.removeEventListener("click", closeButtons),
    []
  );

  return (
    <>
      <div
        className={classNames("manga-entry-buttons", { open: buttonsOpened })}
      >
        <button onClick={props.checkManga}>check</button>
        <button onClick={props.editManga}>edit</button>
        <button onClick={props.deleteManga}>delete</button>
      </div>
      <div
        className={classNames("manga-entry-more", { open: buttonsOpened })}
        onClick={(event) => {
          if (!buttonsOpened) {
            event.stopPropagation();
            document.addEventListener("click", closeButtons);
            setButtonsOpened(true);
          }
        }}
      ></div>
    </>
  );
}

export default MangaButtons;
