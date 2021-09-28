import { MangaEntry } from "./constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isEmpty(value: any): boolean {
  return [undefined, "", 0].includes(value);
}

function getTitle(mangaEntry: MangaEntry): string | undefined {
  if (!isEmpty(mangaEntry.props.title)) return mangaEntry.props.title;

  for (const providerSlug in mangaEntry.providers) {
    const title = mangaEntry.providers?.[providerSlug]?.title;
    if (!isEmpty(title)) return title;
  }
}

function getCover(mangaEntry: MangaEntry): string | undefined {
  for (const providerSlug in mangaEntry.providers) {
    const cover = mangaEntry.providers?.[providerSlug]?.cover;
    if (!isEmpty(cover)) return cover;
  }
}

function getRead(mangaEntry: MangaEntry): number | undefined {
  if (!isEmpty(mangaEntry.props.read)) return mangaEntry.props.read;
}

function getReady(mangaEntry: MangaEntry): number | undefined {
  if (!isEmpty(mangaEntry.props.ready)) return mangaEntry.props.ready;

  for (const providerSlug in mangaEntry.providers) {
    const ready = mangaEntry.providers?.[providerSlug]?.ready;
    if (!isEmpty(ready)) return ready;
  }
}

function getStatus(mangaEntry: MangaEntry): string | undefined {
  if (!isEmpty(mangaEntry.props.status)) return mangaEntry.props.status;
}

const propHandlers = {
  title: getTitle,
  read: getRead,
  ready: getReady,
  cover: getCover,
  status: getStatus,
};

type Keys = keyof typeof propHandlers;

type ReturnType<T> = T extends "title"
  ? string
  : T extends "cover"
  ? string
  : T extends "status"
  ? string
  : number;

function getProp<T extends Keys>(
  mangaEntry: MangaEntry,
  key: T
): ReturnType<T> {
  const handler = propHandlers[key] as (arg0: MangaEntry) => ReturnType<T>;
  const value = handler(mangaEntry);
  if (value !== undefined) return value;

  if (key === "title" || key === "cover") {
    return "" as ReturnType<T>;
  } else {
    return 0 as ReturnType<T>;
  }
}

export default getProp;
