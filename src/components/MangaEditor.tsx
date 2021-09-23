import { FormEvent, useEffect, useState } from "react";
import { deepClone } from "../helpers/clone";
import { MangaPropSlug, MANGA_PROP_SETTINGS } from "../helpers/constants";
import {
  addPropsToMangaEntry,
  parseEditableMangaProps,
} from "../helpers/mangaEntry";
import { MangaEntry, MangaProps } from "../helpers/mangaList";
import MangaPropInput from "./MangaPropInput";

type MangaEditorProps = {
  updateManga: (arg0: MangaEntry) => void;
  mangaEntry?: MangaEntry;
  closeMangaEditor: () => void;
};

function MangaEditor(props: MangaEditorProps): JSX.Element | null {
  const [editedMangaProps, setEditedMangaProps] = useState({} as MangaProps);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newMangaEntry = addPropsToMangaEntry(
      props.mangaEntry,
      editedMangaProps
    );
    props.updateManga(newMangaEntry);
  }

  function setEditedMangaProp(key: MangaPropSlug, value: string) {
    const newEditedMangaProps = deepClone<MangaProps>(editedMangaProps);
    newEditedMangaProps[key] = value;
    setEditedMangaProps(newEditedMangaProps);
  }

  useEffect(() => {
    const newMangaProps = parseEditableMangaProps(props.mangaEntry);
    setEditedMangaProps(newMangaProps);
  }, [props.mangaEntry]);

  const propInputs: Array<JSX.Element> = [];
  let propSlug: keyof typeof MANGA_PROP_SETTINGS;
  for (propSlug in MANGA_PROP_SETTINGS) {
    if (!MANGA_PROP_SETTINGS[propSlug].editable) continue;

    propInputs.push(
      <MangaPropInput
        key={propSlug}
        propSlug={propSlug}
        value={editedMangaProps[propSlug] || ""}
        setMangaProp={setEditedMangaProp}
      />
    );
  }

  return (
    <div className="MangaEditor">
      <h2>manga editor</h2>
      <form onSubmit={handleSubmit}>
        {propInputs}
        <button>{props.mangaEntry === undefined ? "add" : "save"}</button>
      </form>
      <button onClick={props.closeMangaEditor}>cancel</button>
    </div>
  );
}

export default MangaEditor;
