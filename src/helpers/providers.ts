import { MangaEntry } from "./constants";

type Provider = {
  name: string;
  getLastChapter: (mangaEntry: MangaEntry) => Promise<{
    lastChapter: number;
    lastChapterTimestamp: number;
  }>;
  getMangaInfo: (mangaEntry: MangaEntry) => Promise<{
    title?: string;
    cover?: string;
  }>;
  getLink: (mangaEntry: MangaEntry) => string;
};

const PROVIDERS: { [key: string]: Provider } = {};

function registerProvider(slug: string, provider: Provider): void {
  PROVIDERS[slug] = provider;
}

export { registerProvider, PROVIDERS };
