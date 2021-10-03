import { MangaEntry } from "../helpers/constants";

type MangaBadgesProps = {
  mangaEntry: MangaEntry;
  updateManga: (arg0: MangaEntry) => void;
};

function MangaBadges(props: MangaBadgesProps): JSX.Element {
  const badges = [] as JSX.Element[];
  if (props.mangaEntry.temp.isUpdated) {
    badges.push(
      <div
        key="badge-is-updated"
        className="badge badge--isUpdated"
        onClick={() => {
          props.mangaEntry.temp.isUpdated = false;
          props.updateManga(props.mangaEntry);
        }}
      >
        !
      </div>
    );
  }

  return <div className="manga-entry-badges">{badges}</div>;
}

export default MangaBadges;
