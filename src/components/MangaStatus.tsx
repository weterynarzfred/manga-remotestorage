import classNames from "classnames";
import { useEffect, useState } from "react";
import { MangaEntry, StatusTypes, STATUS_LIST } from "../helpers/constants";
import getProp from "../helpers/getProp";

type MangaStatusProps = {
  mangaEntry: MangaEntry;
  updateManga: (arg0: MangaEntry) => void;
};

function MangaStatus(props: MangaStatusProps): JSX.Element {
  const [listOpened, setListOpened] = useState(false);

  function handleStatusChange(statusSlug: StatusTypes) {
    props.mangaEntry.props.status = statusSlug;
    props.updateManga(props.mangaEntry);
    setListOpened(false);
  }

  function closeList() {
    setListOpened(false);
    document.removeEventListener("click", closeList);
  }

  useEffect(() => {
    if (listOpened) document.addEventListener("click", closeList);
  }, [listOpened]);

  useEffect(() => () => document.removeEventListener("click", closeList), []);

  const statusElements = [] as JSX.Element[];
  let statusSlug: StatusTypes;
  for (statusSlug in STATUS_LIST) {
    const statusName = STATUS_LIST[statusSlug];
    statusElements.push(
      <div
        className="status-list-entry"
        key={statusSlug}
        onClick={handleStatusChange.bind(null, statusSlug)}
      >
        {statusName}
      </div>
    );
  }
  return (
    <div
      className="manga-entry-status"
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className="current-status"
        onClick={() => setListOpened((prev) => !prev)}
      >
        {getProp(props.mangaEntry, "status")}
      </div>
      <div className={classNames("status-list", { opened: listOpened })}>
        {statusElements}
      </div>
    </div>
  );
}

export default MangaStatus;
