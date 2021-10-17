import { registerProvider } from "../../helpers/providers";
import { MangaEntry } from "../../helpers/constants";

async function getLastChapter(mangaEntry: MangaEntry) {
  const defaultReturn = {
    lastChapter: 0,
    lastChapterTimestamp: 0,
  };

  if (mangaEntry.providers?.mangatown?.id === undefined) return defaultReturn;
  const mangaId = mangaEntry.providers.mangatown.id;

  const response = await fetch(`https://www.mangatown.com/manga/${mangaId}/`);
  const result = await response.text();

  const chapterMatches = result.matchAll(
    /<li>[^<]*<a href="\/manga\/[^/]*(\/[^/]+)?\/c([0-9.]*)\/?".*?<span class="time">([^<]*?)</gms
  );

  let match = chapterMatches.next();
  let lastChapter = 0;
  let lastChapterTimestamp = 0;

  while (!match.done) {
    lastChapter = parseFloat(match.value[2]);
    lastChapterTimestamp = new Date(match.value[3]).getTime();
    if (!isNaN(lastChapter)) break;
    match = chapterMatches.next();
  }

  return {
    lastChapter: lastChapter || 0,
    lastChapterTimestamp: lastChapterTimestamp || 0,
  };
}

async function getMangaInfo(mangaEntry: MangaEntry) {
  const value: {
    title?: string;
    cover?: string;
  } = {};

  if (mangaEntry.providers?.mangatown?.id === undefined) return value;

  const mangaId = mangaEntry.providers.mangatown.id;

  const response = await fetch(`https://www.mangatown.com/manga/${mangaId}/`);
  const result = await response.text();

  const titleMatch = result.match(/<h1 class="title-top">([^<]*)<\/h1>/ms);
  if (typeof titleMatch?.[1] === "string") {
    value.title = titleMatch[1];
  }

  const coverMatch = result.match(
    /<meta\s+property="og:image"\s+content="([^?"]+)/ms
  );
  if (typeof coverMatch?.[1] === "string") {
    value.cover = coverMatch[1];
  }

  return value;
}

function getLink(mangaEntry: MangaEntry) {
  if (mangaEntry.providers?.mangatown?.id === undefined) return "";
  const mangaId = mangaEntry.providers.mangatown.id;
  return `https://www.mangatown.com/manga/${mangaId}/`;
}

const mangatown = {
  name: "MangaTown",
  getLastChapter,
  getMangaInfo,
  getLink,
};

registerProvider("mangatown", mangatown);
