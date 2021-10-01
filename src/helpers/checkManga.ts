import { MangaEntry, PROVIDER_INFO_INTERVAL } from "./constants";
import { PROVIDERS } from "./providers";

async function checkManga(
  mangaEntry: MangaEntry,
  updateManga: (arg0: MangaEntry) => void
): Promise<void> {
  const currentTimestamp = new Date().getTime();

  if (mangaEntry.temp === undefined) mangaEntry.temp = {};
  mangaEntry.temp.isChecking = true;
  setTimeout(() => updateManga(mangaEntry), 0);

  for (const providerSlug in PROVIDERS) {
    const providerData = mangaEntry.providers[providerSlug];
    if (providerData === undefined) continue;
    const provider = PROVIDERS[providerSlug];

    const lastChapter = await provider.getLastChapter(mangaEntry);
    providerData.ready = lastChapter;
    providerData.lastCheck = currentTimestamp;

    if (
      (providerData.lastInfoCheck || 0) + PROVIDER_INFO_INTERVAL <
      currentTimestamp
    ) {
      const mangaInfo = await provider.getMangaInfo(mangaEntry);
      providerData.lastInfoCheck = currentTimestamp;
      providerData.title = mangaInfo.title;
      providerData.cover = mangaInfo.cover;
    }
  }

  mangaEntry.temp.isChecking = false;
  setTimeout(() => updateManga(mangaEntry), 0);
}

export default checkManga;
