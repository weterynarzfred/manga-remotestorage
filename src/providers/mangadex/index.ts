import { registerProvider } from "../../helpers/providers";
import { MangaEntry } from "../../helpers/constants";

async function getLastChapter(mangaEntry: MangaEntry) {
  if (mangaEntry.providers?.mangadex?.id === undefined) return 0;
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
    `https://api.mangadex.org/manga/${mangaId}/feed?${params}`,
    {
      method: "GET",
    }
  );
  const result = await response.json();

  if (result.result !== "ok") {
    console.error(result.errors);
    return 0;
  }
  if (result.data.length === 0) {
    console.error("no data found");
    return 0;
  }

  return parseFloat(result.data[0].attributes.chapter) || 0;
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

const mangadex = {
  name: "Mangadex",
  getLastChapter,
  getMangaInfo,
};

registerProvider("mangadex", mangadex);
