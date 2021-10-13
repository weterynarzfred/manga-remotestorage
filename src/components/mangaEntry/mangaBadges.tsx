import { useContext } from "react";
import { MangaEntryContext } from "../MangaList";

const badges = {
  isUpdated: "new",
  hasErrors: "!",
};

function MangaBadges(): JSX.Element {
  const entry = useContext(MangaEntryContext);

  const badgeElements = [] as JSX.Element[];
  let badgeKey: keyof typeof badges;
  for (badgeKey in badges) {
    if (entry.manga.temp[badgeKey]) {
      badgeElements.push(
        <div
          key={badgeKey}
          className={`badge badge--${badgeKey}`}
          onClick={() => {
            entry.manga.temp[badgeKey] = false;
            entry.updateManga(entry.manga);
          }}
        >
          {badges[badgeKey]}
        </div>
      );
    }
  }

  return <div className="manga-entry-badges">{badgeElements}</div>;
}

export default MangaBadges;
