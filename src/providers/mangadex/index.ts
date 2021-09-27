import { MangaEntry } from "../../helpers/mangaList";
import { registerProvider } from "../../helpers/providers";
import MFA from "mangadex-full-api";

async function getLastChapter(mangaEntry: MangaEntry) {
  if (mangaEntry.providers?.mangadex?.id === undefined) return 0;

  const chapters = await MFA.Manga.getFeed(
    mangaEntry.providers.mangadex.id,
    {
      translatedLanguage: ["en"],
      // @ts-ignore: mangadex-full-api provided a wrong type definition
      order: {
        chapter: "desc",
      },
      limit: 1,
    },
    false
  );

  return parseFloat(chapters[0].chapter) || 0;
}

async function getMangaInfo(mangaEntry: MangaEntry) {
  if (mangaEntry.providers?.mangadex?.id === undefined) return {};

  const result: {
    title?: string;
    cover?: string;
  } = {};

  const manga = await MFA.Manga.get(mangaEntry.providers.mangadex.id, false);
  result.title = manga.title;

  const coverData = await manga.mainCover.resolve();
  result.cover = coverData.image512;

  return result;
}

const mangadex = {
  name: "Mangadex",
  getLastChapter,
  getMangaInfo,
};

registerProvider("mangadex", mangadex);
