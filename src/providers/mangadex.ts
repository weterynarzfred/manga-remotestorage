import { MangaEntry } from "../helpers/mangaList";
import { registerProvider } from "../helpers/providers";

function getLastChapter(mangaEntry: MangaEntry) {
  console.log(mangaEntry);

  return 1;
}

const mangadex = {
  name: "Mangadex",
  getLastChapter,
};

registerProvider("mangadex", mangadex);
