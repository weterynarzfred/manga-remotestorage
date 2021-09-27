import { MangaEntry } from "./mangaList";

type Provider = {
  name: string;
  getLastChapter: (mangaEntry: MangaEntry) => Promise<number>;
  getMangaInfo: (mangaEntry: MangaEntry) => Promise<{
    title?: string;
    cover?: string;
  }>;
};

const PROVIDERS: { [key: string]: Provider } = {};

function registerProvider(slug: string, provider: Provider): void {
  PROVIDERS[slug] = provider;
}

export { registerProvider, PROVIDERS };
