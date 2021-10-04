import { MangaEntry } from "./constants";
import { PROVIDERS } from "./providers";

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

function getRead(mangaEntry: MangaEntry) {
  if (mangaEntry.props.read !== undefined) return mangaEntry.props.read;
  return 0;
}

function getReady(mangaEntry: MangaEntry) {
  let ready = 0;

  if (mangaEntry.props.ready !== undefined) {
    ready = Math.max(mangaEntry.props.ready, ready);
  }

  for (const providerSlug in mangaEntry.providers) {
    const providerReady = mangaEntry.providers?.[providerSlug]?.ready;
    if (providerReady !== undefined) ready = Math.max(providerReady, ready);
  }

  return ready;
}

function getUnread(mangaEntry: MangaEntry) {
  return Math.round((getReady(mangaEntry) - getRead(mangaEntry)) * 1000) / 1000;
}

function getStatus(mangaEntry: MangaEntry) {
  if (mangaEntry.props.status !== undefined) return mangaEntry.props.status;
  return "current";
}

function getLink(mangaEntry: MangaEntry) {
  let link = "";
  let ready = 0;
  for (const providerSlug in mangaEntry.providers) {
    const providerReady = mangaEntry.providers?.[providerSlug]?.ready || 0;
    if (providerReady > ready) {
      ready = providerReady;
      link = PROVIDERS[providerSlug].getLink(mangaEntry);
    }
  }

  return link;
}

function getScore(mangaEntry: MangaEntry) {
  if (!isEmpty(mangaEntry.props.score)) return mangaEntry.props.score;
  return 0;
}

function getLastUpdate(mangaEntry: MangaEntry) {
  let lastUpdate = 0;

  for (const providerSlug in mangaEntry.providers) {
    const providerLastUpdate = mangaEntry.providers?.[providerSlug]?.lastUpdate;
    if (providerLastUpdate !== undefined)
      lastUpdate = Math.max(providerLastUpdate, lastUpdate);
  }

  return lastUpdate;
}

const propHandlers = {
  title: getTitle,
  read: getRead,
  ready: getReady,
  unread: getUnread,
  cover: getCover,
  status: getStatus,
  link: getLink,
  score: getScore,
  lastUpdate: getLastUpdate,
};

type Keys = keyof typeof propHandlers;

type ReturnType<T> = T extends "title" | "cover" | "link"
  ? string
  : T extends "status"
  ? "current" | "completed" | "planned" | "onHold" | "dropped"
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
