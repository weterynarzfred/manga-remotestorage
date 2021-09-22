import React, { FormEvent, useEffect, useState } from "react";
import { MangaEntry } from "./App";

type MangaEditorProps = {
  updateManga: (arg0: MangaEntry) => void;
  mangaEntry?: MangaEntry;
};

function MangaEditor(props: MangaEditorProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [read, setRead] = useState("");

  useEffect(() => {
    if (props.mangaEntry !== undefined) {
      setTitle(props.mangaEntry.title);
      setRead(props.mangaEntry.read.toString());
    }
  }, [props.mangaEntry]);

  const handleSubmit = function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const floatRead = parseFloat(read);
    props.updateManga({
      id: props.mangaEntry === undefined ? -1 : props.mangaEntry.id,
      read: isNaN(floatRead) ? 0 : floatRead,
      title,
    });
  };

  return (
    <div className="MangaEditor">
      <h2>manga editor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="read"
          value={read}
          onChange={(event) => setRead(event.target.value)}
        />
        <button>submit</button>
      </form>
    </div>
  );
}

export default MangaEditor;
