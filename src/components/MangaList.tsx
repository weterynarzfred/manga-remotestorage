import { MangaEntry, MangaEntryList } from "../helpers/constants";
import getProp from "../helpers/getProp";
import MangaEntryElement from "./MangaEntry";

type MangaListProps = {
  mangaList: MangaEntryList;
  checkManga: (arg0: MangaEntry) => void;
  editManga: (arg0: number) => void;
  deleteManga: (arg0: number) => void;
  updateManga: (arg0: MangaEntry) => void;
};

const statePriorities = {
  current: 5,
  completed: 4,
  planned: 3,
  onHold: 2,
  dropped: 1,
};

function MangaList(props: MangaListProps): JSX.Element {
  const mangaEntryElements = [] as {
    element: JSX.Element;
    manga: MangaEntry;
  }[];
  for (const mangaId in props.mangaList.entries) {
    const manga = props.mangaList.entries[mangaId];
    mangaEntryElements.push({
      element: (
        <MangaEntryElement
          mangaEntry={manga}
          key={mangaId}
          checkManga={() => props.checkManga(manga)}
          editManga={() => props.editManga(parseInt(mangaId))}
          updateManga={props.updateManga}
          deleteManga={() => props.deleteManga(parseInt(mangaId))}
        />
      ),
      manga,
    });
  }

  mangaEntryElements.sort((a, b) => {
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
  });

  return (
    <div className="MangaList">
      {mangaEntryElements.map((obj) => obj.element)}
    </div>
  );
}

export default MangaList;
