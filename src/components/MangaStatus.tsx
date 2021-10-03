import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { StatusTypes, STATUS_LIST } from "../helpers/constants";
import getProp from "../helpers/getProp";
import { MangaEntryContext } from "./MangaList";

function MangaStatus(): JSX.Element {
  const entry = useContext(MangaEntryContext);
  const [listOpened, setListOpened] = useState(false);

  function handleStatusChange(statusSlug: StatusTypes) {
    entry.manga.props.status = statusSlug;
    entry.updateManga(entry.manga);
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
        {getProp(entry.manga, "status")}
      </div>
      <div className={classNames("status-list", { opened: listOpened })}>
        {statusElements}
      </div>
    </div>
  );
}

export default MangaStatus;
