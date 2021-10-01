import { MangaEntry } from "./constants";
import getProp from "./getProp";

const statePriorities = {
  current: 5,
  onHold: 4,
  planned: 3,
  completed: 2,
  dropped: 1,
};

function sortEntries(
  a: {
    element: JSX.Element;
    manga: MangaEntry;
  },
  b: {
    element: JSX.Element;
    manga: MangaEntry;
  }
): number {
  const propsA = {
    unread: getProp(a.manga, "unread"),
    status: statePriorities[getProp(a.manga, "status")],
    score: getProp(a.manga, "score"),
  };
  const propsB = {
    unread: getProp(b.manga, "unread"),
    status: statePriorities[getProp(b.manga, "status")],
    score: getProp(b.manga, "score"),
  };

  if (propsA.status !== propsB.status) {
    return propsB.status - propsA.status;
  }

  if ((propsA.unread === 0) !== (propsB.unread === 0)) {
    return propsB.unread - propsA.unread;
  }

  if (propsA.score !== propsB.score) {
    return propsB.score - propsA.score;
  }

  if (propsA.unread !== propsB.unread) {
    return propsB.unread - propsA.unread;
  }

  return 0;
}

export default sortEntries;
