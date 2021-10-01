import _ from "lodash";
import { MangaEntry, PROVIDER_INFO_INTERVAL, StatusTypes } from "./constants";
import { PROVIDERS } from "./providers";

const PROVIDER_INTEVALS = {
  current: 1000 * 60,
  planned: 1000 * 60 * 60 * 24 * 3,
  onHold: 1000 * 60 * 60 * 24 * 30 * 3,
  completed: 1000 * 60 * 60 * 24 * 30 * 6,
  dropped: 1000 * 60 * 60 * 24 * 365,
} as {
  [key in StatusTypes]: number;
};

async function checkManga(
  mangaEntry: MangaEntry,
  updateManga: (arg0: MangaEntry) => void,
  force?: boolean
): Promise<void> {
  const currentTimestamp = new Date().getTime();

  for (const providerSlug in PROVIDERS) {
    const providerData = mangaEntry.providers[providerSlug];
    if (providerData === undefined) continue;
    const status = mangaEntry.props.status;
    if (
      !force &&
      (status === undefined ||
        (providerData.lastCheck || 0) + PROVIDER_INTEVALS[status] <
          currentTimestamp)
    )
      continue;

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

  _.set(mangaEntry, "temp.isChecking", false);
  setTimeout(() => updateManga(mangaEntry), 0);
}

export default checkManga;
