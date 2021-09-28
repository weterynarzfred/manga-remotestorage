import { FormEvent, useEffect, useState } from "react";
import _ from "lodash";
import { deepClone } from "../helpers/clone";
import MangaPropInputs from "./MangaPropInputs";
import { PROVIDERS } from "../helpers/providers";
import { MangaEntry, MangaProps, ProviderProps } from "../helpers/constants";
import parseMangaEntry from "../helpers/parseMangaEntry";

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
    key: keyof MangaProps | keyof ProviderProps,
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
        props: {
          title: undefined,
          read: undefined,
          ready: undefined,
          status: undefined,
          score: undefined,
        },
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
