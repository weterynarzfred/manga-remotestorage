import { MangaEntry } from "../helpers/constants";
import getProp from "../helpers/getProp";
import MangaScore from "./MangaScore";
import MangaProgress from "./MangaProgress";
import MangaBadges from "./mangaBadges";
import MangaCover from "./MangaCover";
import getMangaEntryClasses from "../helpers/getMangaEntryClasses";
import MangaButtons from "./MangaButtons";
import MangaStatus from "./MangaStatus";

type MangaEntryProps = {
  mangaEntry: MangaEntry;
  checkManga: () => void;
  editManga: () => void;
  deleteManga: () => void;
  updateManga: (arg0: MangaEntry) => void;
};

function MangaEntryElement(props: MangaEntryProps): JSX.Element {
  return (
    <div className={getMangaEntryClasses(props.mangaEntry)}>
      <MangaBadges
        mangaEntry={props.mangaEntry}
        updateManga={props.updateManga}
      />
      <MangaCover mangaEntry={props.mangaEntry} />
      <MangaStatus
        mangaEntry={props.mangaEntry}
        updateManga={props.updateManga}
      />
      <MangaButtons
        mangaEntry={props.mangaEntry}
        checkManga={props.checkManga}
        editManga={props.editManga}
        deleteManga={props.deleteManga}
      />
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
