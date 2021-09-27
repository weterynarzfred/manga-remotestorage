import {
  MangaProps,
  MANGA_PROP_SETTINGS,
  PropSettings,
  ProviderProps,
  PROVIDER_INFO_INTERVAL,
  PROVIDER_PROP_SETTINGS,
} from "./constants";
import { MangaEntry } from "./mangaList";
import { PROVIDERS } from "./providers";

function parseMangaEntry(mangaEntry: MangaEntry): MangaEntry {
  let mangaPropKey: keyof typeof MANGA_PROP_SETTINGS;
  for (mangaPropKey in MANGA_PROP_SETTINGS) {
    const parsedValue = parsePropValue(
      mangaPropKey,
      mangaEntry.props[mangaPropKey]
    );

    mangaEntry.props = {
      ...mangaEntry.props,
      [mangaPropKey]: parsedValue,
    };
  }

  let ProviderSlug: keyof typeof PROVIDERS;
  for (ProviderSlug in mangaEntry.providers) {
    const provider = mangaEntry.providers[ProviderSlug];
    if (provider === undefined) continue;

    let providerPropKey: keyof typeof PROVIDER_PROP_SETTINGS;
    for (providerPropKey in PROVIDER_PROP_SETTINGS) {
      const parsedValue = parsePropValue(
        providerPropKey,
        provider[providerPropKey],
        ProviderSlug
      );

      mangaEntry.providers[ProviderSlug] = {
        ...provider,
        [providerPropKey]: parsedValue,
      };
    }
  }

  return mangaEntry;
}

function parsePropValue(
  key: keyof MangaProps | keyof ProviderProps,
  value: string | number | undefined,
  provider?: keyof typeof PROVIDERS
): string | number {
  let settings: PropSettings;
  if (provider === undefined) {
    settings = MANGA_PROP_SETTINGS[key as keyof MangaProps];
  } else {
    settings = PROVIDER_PROP_SETTINGS[key as keyof ProviderProps];
  }

  if (value === undefined) {
    return settings.defaultValue;
  }

  if (settings.transform !== undefined) {
    value = settings.transform(value);
  }

  if (value === "") {
    return settings.defaultValue;
  }

  return value;
}

async function checkManga(
  mangaEntry: MangaEntry,
  updateManga: (arg0: MangaEntry) => void
): Promise<void> {
  const currentTimestamp = new Date().getTime();
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

    updateManga(mangaEntry);
  }
}

export { parseMangaEntry, checkManga };
