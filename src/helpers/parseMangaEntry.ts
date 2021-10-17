import {
  MangaEntry,
  MangaProps,
  MANGA_PROP_SETTINGS,
  ProviderProps,
  PROVIDER_PROP_SETTINGS,
  StatusTypes,
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

  if (settings.type === "number") {
    value = parseFloat(value.toString());
    if (isNaN(value)) value = 0;
  }

  if (provider !== undefined && key === "id" && typeof value === "string") {
    value = PROVIDERS[provider].getIdFromUrl(value);
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

    if (mangaPropKey === "title" || mangaPropKey === "cover") {
      mangaEntry.props[mangaPropKey] = parsedValue as string;
    } else if (mangaPropKey === "status") {
      mangaEntry.props[mangaPropKey] = parsedValue as StatusTypes;
    } else {
      mangaEntry.props[mangaPropKey] = parsedValue as number;
    }
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

      if (
        providerPropKey === "title" ||
        providerPropKey === "id" ||
        providerPropKey === "cover"
      ) {
        provider[providerPropKey] = parsedValue as string;
      } else {
        provider[providerPropKey] = parsedValue as number;
      }
    }
  }

  return mangaEntry;
}

export default parseMangaEntry;
