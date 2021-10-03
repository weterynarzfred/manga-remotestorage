import { useContext } from "react";
import { MangaEntryContext } from "./MangaList";

function MangaBadges(): JSX.Element {
  const entry = useContext(MangaEntryContext);

  const badges = [] as JSX.Element[];
  if (entry.manga.temp.isUpdated) {
    badges.push(
      <div
        key="badge-is-updated"
        className="badge badge--isUpdated"
        onClick={() => {
          entry.manga.temp.isUpdated = false;
          entry.updateManga(entry.manga);
        }}
      >
        !
      </div>
    );
  }

  return <div className="manga-entry-badges">{badges}</div>;
}

export default MangaBadges;
