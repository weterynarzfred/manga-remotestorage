import {
  MangaProps,
  MANGA_PROP_SETTINGS,
  PropSettings,
  ProviderProps,
  PROVIDER_PROP_SETTINGS,
} from "./constants";

function getPropSettings(
  propSlug: keyof MangaProps | keyof ProviderProps,
  isFromProvider: boolean
): PropSettings {
  if (isFromProvider) {
    return PROVIDER_PROP_SETTINGS[propSlug as keyof ProviderProps];
  } else {
    return MANGA_PROP_SETTINGS[propSlug as keyof MangaProps];
  }
}

export default getPropSettings;
