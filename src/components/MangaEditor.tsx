import React, { FormEvent, useState } from "react";
import { MangaEntry } from "./App";

type MangaEditorProps = {
  updateManga: (arg0: MangaEntry) => void;
}

function MangaEditor(props: MangaEditorProps) :JSX.Element {
  const [title, setTitle] = useState('');

  const handleSubmit = function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.updateManga({
      id: -1,
      read: 0,
      title
    });
  };

  return <div className="MangaEditor">
    <h2>manga editor</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
    </form>
  </div>
}

export default MangaEditor;