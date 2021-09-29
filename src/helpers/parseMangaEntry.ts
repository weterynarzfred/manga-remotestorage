import {
  MangaEntry,
  MangaProps,
  MANGA_PROP_SETTINGS,
  ProviderProps,
  PROVIDER_PROP_SETTINGS,
} from "./constants";
import getPropSettings from "./getPropSettings";
import { PROVIDERS } from "./providers";

function parsePropValue(
  key: keyof MangaProps | keyof ProviderProps,
  value: string | number | undefined,
  provider?: keyof typeof PROVIDERS
): string | number {
  const settings = getPropSettings(key, provider !== undefined);

  if (value === undefined) {
    return settings.defaultValue;
  }

  if (settings.transform !== undefined) {
    value = settings.transform(value);
  }

  if (value === "" || value === 0) {
    return settings.defaultValue;
  }

  return value;
}

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

export default parseMangaEntry;
