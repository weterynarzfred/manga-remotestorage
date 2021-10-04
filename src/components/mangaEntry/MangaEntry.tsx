import { useContext } from "react";
import getProp from "../../helpers/getProp";
import MangaScore from "./MangaScore";
import MangaProgress from "./MangaProgress";
import MangaBadges from "./mangaBadges";
import MangaCover from "./MangaCover";
import MangaButtons from "./MangaButtons";
import MangaStatus from "./MangaStatus";
import getMangaEntryClasses from "../../helpers/getMangaEntryClasses";
import { MangaEntryContext } from "../MangaList";

function MangaEntryElement(): JSX.Element {
  const entry = useContext(MangaEntryContext);

  return (
    <div className={getMangaEntryClasses(entry.manga)}>
      <MangaBadges />
      <MangaCover />
      <MangaStatus />
      <MangaButtons />
      <div className="manga-entry-info">
        <MangaScore />
        <MangaProgress />
        <a
          className="manga-entry-title"
          href={getProp(entry.manga, "link")}
          target="_blank"
          rel="noreferrer"
        >
          {getProp(entry.manga, "title")}
        </a>
      </div>
    </div>
  );
}

export default MangaEntryElement;
