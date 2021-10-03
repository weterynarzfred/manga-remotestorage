import { MangaEntry } from "../helpers/constants";
import getProp from "../helpers/getProp";

type MangaCoverProps = {
  mangaEntry: MangaEntry;
};

function MangaCover(props: MangaCoverProps): JSX.Element {
  const cover = getProp(props.mangaEntry, "cover");
  const coverElement =
    cover === "" ? (
      <div className="manga-entry-cover-cake"></div>
    ) : (
      <div className="manga-entry-cover-cake lazyload" data-bg={cover}></div>
    );

  return (
    <a
      className="manga-entry-cover"
      href={getProp(props.mangaEntry, "link")}
      target="_blank"
      rel="noreferrer"
    >
      {coverElement}
    </a>
  );
}

export default MangaCover;
