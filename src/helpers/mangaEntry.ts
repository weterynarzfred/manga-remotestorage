import { MANGA_PROP_SETTINGS } from "./constants";
import { MangaEntry, MangaProps } from "./mangaList";

function addPropsToMangaEntry(
  mangaEntry: MangaEntry | undefined,
  editedMangaProps: MangaProps
): MangaEntry {
  const newManga: MangaEntry = {
    id: mangaEntry === undefined ? -1 : mangaEntry.id,
    props: {},
  };
  let propSlug: keyof MangaProps;
  for (propSlug in MANGA_PROP_SETTINGS) {
    const propSettings = MANGA_PROP_SETTINGS[propSlug];

    let value = editedMangaProps[propSlug];
    if (value === undefined || value === "") {
      value = propSettings.defaultValue;
    }
    const transform = propSettings.transform;
    if (transform !== undefined) value = transform(value);
    newManga.props[propSlug] = value;
  }

  return newManga;
}

export { addPropsToMangaEntry };
