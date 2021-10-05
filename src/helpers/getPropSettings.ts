import {
  MangaProps,
  MANGA_PROP_SETTINGS,
  PropSettings,
  ProviderProps,
  PROVIDER_PROP_SETTINGS,
} from "./constants";

function getPropSettings<
  T extends MangaProps & ProviderProps,
  K extends keyof T
>(propSlug: K, isFromProvider?: boolean): PropSettings<T, K> {
  if (isFromProvider) {
    return PROVIDER_PROP_SETTINGS[
      propSlug as keyof ProviderProps
    ] as PropSettings<T, K>;
  } else {
    return MANGA_PROP_SETTINGS[propSlug as keyof MangaProps] as PropSettings<
      T,
      K
    >;
  }
}

export default getPropSettings;
