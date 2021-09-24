import { MangaEntry } from "../../helpers/mangaList";
import { registerProvider } from "../../helpers/providers";
import MFA from "mangadex-full-api";

async function getLastChapter(mangaEntry: MangaEntry) {
  if (mangaEntry.providers?.mangadex?.id === undefined) return 0;

  const chapters = await MFA.Manga.getFeed(
    mangaEntry.providers.mangadex.id,
    {
      translatedLanguage: ["en"],
      order: {
        chapter: "desc",
      },
      limit: 1,
    },
    false
  );

  return parseFloat(chapters[0].chapter) || 0;
}

const mangadex = {
  name: "Mangadex",
  getLastChapter,
};

registerProvider("mangadex", mangadex);
