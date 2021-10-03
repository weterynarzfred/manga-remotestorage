import { registerProvider } from "../../helpers/providers";
import { MangaEntry } from "../../helpers/constants";

async function getLastChapter(mangaEntry: MangaEntry) {
  if (mangaEntry.providers?.mangatown?.id === undefined) return 0;
  const mangaId = mangaEntry.providers.mangatown.id;

  const response = await fetch(`https://www.mangatown.com/manga/${mangaId}/`);
  const result = await response.text();

  const chapterMatches = result.matchAll(
    /<li>[^<]*?<a href="\/manga\/[^/]*?\/c([0-9.]*).*?class="time">([^<]*?)<\/span>/gms
  );

  let match = chapterMatches.next();
  let latestChapter = -1;

  while (!match.done) {
    latestChapter = parseFloat(match.value[1]);
    if (!isNaN(latestChapter)) break;
    match = chapterMatches.next();
  }

  return latestChapter || 0;
}

async function getMangaInfo(mangaEntry: MangaEntry) {
  const value: {
    title?: string;
    cover?: string;
  } = {};

  if (mangaEntry.providers?.mangatown?.id === undefined) return value;

  // TODO: get info
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
