import React, { FormEvent, useEffect, useState } from "react";
import { deepClone } from "../helpers/clone";
import { MangaProps, MangaPropSlug, MANGA_PROPS } from "../helpers/constants";
import { MangaEntry } from "../helpers/mangaList";
import MangaPropInput from "./MangaPropInput";

type MangaEditorProps = {
  updateManga: (arg0: MangaEntry) => void;
  mangaEntry?: MangaEntry;
};

function MangaEditor(props: MangaEditorProps): JSX.Element {
  const [editedMangaProps, setEditedMangaProps] = useState({} as MangaProps);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newManga: MangaEntry = {
      id: props.mangaEntry === undefined ? "-1" : props.mangaEntry.id,
    };
    let propSlug: keyof typeof MANGA_PROPS;
    for (propSlug in MANGA_PROPS) {
      let value = editedMangaProps[propSlug];
      if (value === undefined) value = MANGA_PROPS[propSlug].defaultValue;
      newManga[propSlug] = value;
    }

    props.updateManga(newManga);
  }

  function setMangaProp(key: MangaPropSlug, value: string) {
    const newMangaProps = deepClone<MangaProps>(editedMangaProps);
    newMangaProps[key] = value;
    setEditedMangaProps(newMangaProps);
  }

  useEffect(() => {
    if (props.mangaEntry === undefined) return;
    const newMangaProps: MangaProps = {};
    let propSlug: keyof typeof MANGA_PROPS;
    for (propSlug in MANGA_PROPS) {
      let value = props.mangaEntry[propSlug];
      if (value === undefined) value = MANGA_PROPS[propSlug].defaultValue;
      newMangaProps[propSlug] = value.toString();
    }
    setEditedMangaProps(newMangaProps);
  }, [props.mangaEntry]);

  const propInputs: Array<JSX.Element> = [];
  let propSlug: keyof typeof MANGA_PROPS;
  for (propSlug in MANGA_PROPS) {
    if (!MANGA_PROPS[propSlug].editable) continue;

    propInputs.push(
      <MangaPropInput
        key={propSlug}
        propSlug={propSlug}
        value={editedMangaProps[propSlug] || ""}
        setMangaProp={setMangaProp}
      />
    );
  }

  return (
    <div className="MangaEditor">
      <h2>manga editor</h2>
      <form onSubmit={handleSubmit}>
        {propInputs}
        <button>submit</button>
      </form>
    </div>
  );
}

export default MangaEditor;
