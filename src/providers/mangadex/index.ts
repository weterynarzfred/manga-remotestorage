import { registerProvider } from "../../helpers/providers";
import { MangaEntry } from "../../helpers/constants";

async function getLastChapter(mangaEntry: MangaEntry) {
  const defaultReturn = {
    lastChapter: 0,
    lastChapterTimestamp: 0,
  };

  if (mangaEntry.providers?.mangadex?.id === undefined) return defaultReturn;
  const mangaId = mangaEntry.providers.mangadex.id;

  const params = new URLSearchParams();
  params.append("limit", "1");
  params.append("translatedLanguage[]", "en");
  params.append("contentRating[]", "safe");
  params.append("contentRating[]", "suggestive");
  params.append("contentRating[]", "erotica");
  params.append("contentRating[]", "pornographic");
  params.append("order[chapter]", "desc");

  const response = await fetch(
    `https://api.mangadex.org/manga/${mangaId}/feed?${params}`
  );
  const result = await response.json();

  if (result.result !== "ok") {
    console.error(result.errors);
    return defaultReturn;
  }
  if (result.data.length === 0) {
    console.error("no data found");
    return defaultReturn;
  }

  return {
    lastChapter: parseFloat(result.data[0].attributes.chapter) || 0,
    lastChapterTimestamp: new Date(
      result.data[0].attributes.createdAt
    ).getTime(),
  };
}

async function getCover(
  mangaId: string,
  coverId: string
): Promise<string | undefined> {
  const params = new URLSearchParams();
  params.append("ids[]", coverId);

  const response = await fetch(`https://api.mangadex.org/cover/?${params}`, {
    method: "GET",
  });

  const result = await response.json();

  if (result.result !== "ok") {
    console.error(result.errors);
    return;
  }
  if (result.data.length === 0) {
    console.error("no data found");
    return;
  }
  const fileName = result.data[0].attributes.fileName;
  return `https://uploads.mangadex.org/covers/${mangaId}/${fileName}.512.jpg`;
}

async function getMangaInfo(mangaEntry: MangaEntry) {
  const value: {
    title?: string;
    cover?: string;
  } = {};

  if (mangaEntry.providers?.mangadex?.id === undefined) return value;
  const mangaId = mangaEntry.providers.mangadex.id;

  const response = await fetch(`https://api.mangadex.org/manga/${mangaId}`, {
    method: "GET",
  });

  const result = await response.json();

  if (result.result !== "ok") {
    console.error(result.errors);
    return value;
  }

  value.title = result.data.attributes.title.en;
  for (const relationship of result.data.relationships) {
    if (relationship.type !== "cover_art") continue;
    value.cover = await getCover(mangaId, relationship.id);
  }

  return value;
}

function getLink(mangaEntry: MangaEntry) {
  if (mangaEntry.providers?.mangadex?.id === undefined) return "";
  const mangaId = mangaEntry.providers.mangadex.id;
  return `https://mangadex.org/title/${mangaId}/`;
}

function getIdFromUrl(url: string) {
  if (url.search("/") === -1) return url;
  const match = url.match(/[0-9\-a-f]{36,}/);
  return match === null ? "" : match[0];
}

const mangadex = {
  name: "Mangadex",
  getLastChapter,
  getMangaInfo,
  getLink,
  getIdFromUrl,
};

registerProvider("mangadex", mangadex);
