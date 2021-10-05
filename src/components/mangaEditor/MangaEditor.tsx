import { FormEvent, useEffect, useState } from "react";
import _ from "lodash";
import MangaPropInputs from "./MangaPropInputs";
import { PROVIDERS } from "../../helpers/providers";
import {
  defaultManga,
  MangaEntry,
  MangaProps,
  ProviderProps,
} from "../../helpers/constants";
import parseMangaEntry from "../../helpers/parseMangaEntry";
import "../../scss/mangaEditor.scss";

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
    setEditedMangaEntry((prevEditedMangaEntry) => {
      const newEditedMangaEntry = { ...prevEditedMangaEntry };
      if (provider === undefined) {
        _.set(newEditedMangaEntry, `props.${key}`, value);
      } else {
        _.set(newEditedMangaEntry, `providers.${provider}.${key}`, value);
      }
      return newEditedMangaEntry;
    });
  }

  useEffect(() => {
    if (props.mangaEntry === undefined) {
      setEditedMangaEntry(defaultManga);
    } else {
      setEditedMangaEntry(props.mangaEntry);
    }
  }, [props.mangaEntry]);

  return (
    <div className="MangaEditor">
      <form onSubmit={handleSubmit}>
        <MangaPropInputs
          editedMangaEntry={editedMangaEntry}
          setEditedProp={setEditedProp}
          closeMangaEditor={props.closeMangaEditor}
          isNew={props.mangaEntry === undefined}
        />
      </form>
    </div>
  );
}

export default MangaEditor;
