import {
  MangaPropSlug,
  MANGA_PROP_SETTINGS,
  PropSettings,
  ProviderPropSlug,
  PROVIDERS,
  PROVIDER_PROP_SETTINGS,
} from "./constants";
import { MangaEntry } from "./mangaList";

function parseMangaEntry(mangaEntry: MangaEntry): MangaEntry {
  for (const mangaPropKeyString in MangaPropSlug) {
    const mangaPropKey = mangaPropKeyString as MangaPropSlug;
    mangaEntry.props[mangaPropKey] = parsePropValue(
      mangaPropKey,
      mangaEntry.props[mangaPropKey]
    );
  }

  let ProviderSlug: keyof typeof PROVIDERS;
  for (ProviderSlug in mangaEntry.providers) {
    const provider = mangaEntry.providers[ProviderSlug];
    if (provider === undefined) continue;

    for (const providerPropKeyString in ProviderPropSlug) {
      const providerPropKey = providerPropKeyString as ProviderPropSlug;
      provider[providerPropKey] = parsePropValue(
        providerPropKey,
        provider[providerPropKey],
        ProviderSlug
      );
    }
  }

  return mangaEntry;
}

function parsePropValue(
  key: ProviderPropSlug | MangaPropSlug,
  value: string | undefined,
  provider?: keyof typeof PROVIDERS
): string {
  let settings: PropSettings;
  if (provider === undefined) {
    settings = MANGA_PROP_SETTINGS[key as MangaPropSlug];
  } else {
    settings = PROVIDER_PROP_SETTINGS[key as ProviderPropSlug];
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

export { parseMangaEntry };
