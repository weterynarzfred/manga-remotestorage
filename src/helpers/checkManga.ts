import {
  MangaEntry,
  ProviderProps,
  PROVIDER_INFO_INTERVAL,
  StatusTypes,
} from "./constants";
import getProp from "./getProp";
import { PROVIDERS } from "./providers";

const PROVIDER_INTEVALS = {
  current: 1000 * 60 * 60 * 6,
  planned: 1000 * 60 * 60 * 24 * 30 * 3,
  onHold: 1000 * 60 * 60 * 24 * 30 * 3,
  completed: 1000 * 60 * 60 * 24 * 30 * 6,
  dropped: 1000 * 60 * 60 * 24 * 365,
} as {
  [key in StatusTypes]: number;
};

const LAST_UPDATE_TIME_DIVIDER = 20;

function willProviderBeChecked(
  mangaEntry: MangaEntry,
  providerData: ProviderProps | undefined,
  force?: boolean
): boolean {
  if (providerData === undefined) return false;

  if (force) return true;

  const lastProviderUpdate = providerData.lastUpdate;
  if (lastProviderUpdate === undefined || lastProviderUpdate === 0) return true;

  const currentTimestamp = new Date().getTime();
  const status = getProp(mangaEntry, "status");
  const timeSinceLastUpdate = currentTimestamp - lastProviderUpdate;
  const interval = Math.min(
    Math.max(
      PROVIDER_INTEVALS[status],
      timeSinceLastUpdate / LAST_UPDATE_TIME_DIVIDER
    ),
    1000 * 60 * 60 * 24 * 365
  );

  if ((providerData.lastCheck || 0) + interval > currentTimestamp) return false;

  return true;
}

function willMangaGetChecked(mangaEntry: MangaEntry, force?: boolean): boolean {
  for (const providerSlug in PROVIDERS) {
    const providerData = mangaEntry.providers[providerSlug];
    if (willProviderBeChecked(mangaEntry, providerData, force)) return true;
  }

  return false;
}

async function checkManga(
  mangaEntry: MangaEntry,
  updateManga: (arg0: MangaEntry) => void,
  force?: boolean
): Promise<void> {
  const currentTimestamp = new Date().getTime();
  const readyBefore = getProp(mangaEntry, "ready");

  for (const providerSlug in PROVIDERS) {
    const providerData = mangaEntry.providers[providerSlug];
    if (providerData === undefined || providerData.id === "") continue;
    if (!willProviderBeChecked(mangaEntry, providerData, force)) continue;

    mangaEntry.temp.isChecking = true;

    const provider = PROVIDERS[providerSlug];

    try {
      const { lastChapter, lastChapterTimestamp } =
        await provider.getLastChapter(mangaEntry);
      if (
        providerData.ready === undefined ||
        lastChapter > providerData.ready
      ) {
        providerData.ready = lastChapter;
        providerData.lastUpdate = lastChapterTimestamp;
      }
      providerData.lastCheck = currentTimestamp;
      console.log(
        getProp(mangaEntry, "title"),
        providerSlug,
        lastChapter,
        lastChapterTimestamp
      );

      if (
        force ||
        (providerData.lastInfoCheck || 0) + PROVIDER_INFO_INTERVAL <
          currentTimestamp
      ) {
        const mangaInfo = await provider.getMangaInfo(mangaEntry);
        providerData.lastInfoCheck = currentTimestamp;
        if (mangaInfo.title !== undefined) providerData.title = mangaInfo.title;
        if (mangaInfo.cover !== undefined) providerData.cover = mangaInfo.cover;
        console.log(mangaInfo);
      }
    } catch (error) {
      console.log("provider function failed", error);
      mangaEntry.temp.hasErrors = true;
    }
  }

  if (getProp(mangaEntry, "ready") > readyBefore) {
    mangaEntry.temp.isUpdated = true;
  }

  mangaEntry.temp.isChecking = false;
  setTimeout(() => updateManga(mangaEntry), 0);
}

export default checkManga;
export { willMangaGetChecked };
