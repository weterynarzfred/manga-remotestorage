import { useContext } from "react";
import getProp from "../helpers/getProp";
import { MangaEntryContext } from "./MangaList";

function MangaCover(): JSX.Element {
  const entry = useContext(MangaEntryContext);

  const cover = getProp(entry.manga, "cover");
  const coverElement =
    cover === "" ? (
      <div className="manga-entry-cover-cake"></div>
    ) : (
      <div className="manga-entry-cover-cake lazyload" data-bg={cover}></div>
    );

  return (
    <a
      className="manga-entry-cover"
      href={getProp(entry.manga, "link")}
      target="_blank"
      rel="noreferrer"
    >
      {coverElement}
    </a>
  );
}

export default MangaCover;
