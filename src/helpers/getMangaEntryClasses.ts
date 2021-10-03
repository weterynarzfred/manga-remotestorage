import classNames from "classnames";
import { MangaEntry } from "./constants";
import getProp from "./getProp";

function getMangaEntryClasses(mangaEntry: MangaEntry): string {
  return classNames("MangaEntry", {
    mangaUnread: getProp(mangaEntry, "unread") > 0,
    mangaLoading: mangaEntry.temp?.isChecking,
    mangaCompleted: mangaEntry.props.status === "completed",
    mangaCurrent: mangaEntry.props.status === "current",
    mangaDropped: mangaEntry.props.status === "dropped",
    mangaOnHold: mangaEntry.props.status === "onHold",
    mangaPlanned: mangaEntry.props.status === "planned",
    mangaHasScore: getProp(mangaEntry, "score") > 0,
  });
}

export default getMangaEntryClasses;
