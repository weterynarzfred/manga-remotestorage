import { MangaEntry } from "./mangaList";

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

function getRead(mangaEntry: MangaEntry): string | undefined {
  if (!isEmpty(mangaEntry.props.read)) return mangaEntry.props.read;
}

function getReady(mangaEntry: MangaEntry): string | undefined {
  if (!isEmpty(mangaEntry.props.ready)) return mangaEntry.props.ready;

  for (const providerSlug in mangaEntry.providers) {
    const ready = mangaEntry.providers?.[providerSlug]?.ready;
    if (!isEmpty(ready)) return ready;
  }

  return "0";
}

type GettableProps = "title" | "read" | "ready";

const propHandlers: {
  [key in GettableProps]: (arg0: MangaEntry) => string | undefined;
} = {
  title: getTitle,
  read: getRead,
  ready: getReady,
};

function getProp(mangaEntry: MangaEntry, key: GettableProps): string {
  const value = propHandlers[key](mangaEntry);
  if (value !== undefined) return value;

  return "";
}

export default getProp;
