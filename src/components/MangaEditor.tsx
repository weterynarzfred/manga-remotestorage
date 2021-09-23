import { FormEvent, useEffect, useState } from "react";
import _ from "lodash";
import { deepClone } from "../helpers/clone";
import {
  MangaPropSlug,
  ProviderPropSlug,
  PROVIDERS,
} from "../helpers/constants";
import { MangaEntry } from "../helpers/mangaList";
import MangaPropInputs from "./MangaPropInputs";
import { parseMangaEntry } from "../helpers/mangaEntry";

type MangaEditorProps = {
  updateManga: (arg0: MangaEntry) => void;
  mangaEntry?: MangaEntry;
  closeMangaEditor: () => void;
};

function MangaEditor(props: MangaEditorProps): JSX.Element | null {
  const [editedMangaEntry, setEditedMangaEntry] = useState({} as MangaEntry);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.updateManga(parseMangaEntry(editedMangaEntry));
  }

  function setEditedProp(
    key: ProviderPropSlug | MangaPropSlug,
    value: string,
    provider?: keyof typeof PROVIDERS
  ) {
    const newEditedMangaEntry = deepClone(editedMangaEntry);

    if (provider === undefined) {
      _.set(newEditedMangaEntry, `props.${key}`, value);
    } else {
      _.set(newEditedMangaEntry, `providers.${provider}.${key}`, value);
    }
    setEditedMangaEntry(newEditedMangaEntry);
  }

  useEffect(() => {
    if (props.mangaEntry === undefined) {
      setEditedMangaEntry({
        id: -1,
        props: {},
        providers: {},
      });
    } else {
      setEditedMangaEntry(deepClone(props.mangaEntry));
    }
  }, [props.mangaEntry]);

  return (
    <div className="MangaEditor">
      <h2>manga editor</h2>
      <form onSubmit={handleSubmit}>
        <MangaPropInputs
          editedMangaEntry={editedMangaEntry}
          setEditedProp={setEditedProp}
        />
        <button>{props.mangaEntry === undefined ? "add" : "save"}</button>
      </form>
      <button onClick={props.closeMangaEditor}>cancel</button>
    </div>
  );
}

export default MangaEditor;
