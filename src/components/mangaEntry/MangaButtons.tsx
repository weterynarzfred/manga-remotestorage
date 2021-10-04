import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { MangaEntryContext } from "../MangaList";

function MangaButtons(): JSX.Element {
  const entry = useContext(MangaEntryContext);
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
        <button onClick={entry.checkManga}>check</button>
        <button onClick={entry.editManga}>edit</button>
        <button onClick={entry.deleteManga}>delete</button>
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
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default MangaButtons;
