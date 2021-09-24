import { useContext, useEffect, useState } from "react";
import { StorageContext } from "..";
import "../scss/index.scss";
import MangaList from "./MangaList";
import MangaEditor from "./MangaEditor";
import { getStoredData, storeData } from "../helpers/storage";
import {
  deleteManga,
  defaultMangaList,
  updateMangaList,
  MangaEntry,
} from "../helpers/mangaList";
import { checkManga } from "../helpers/mangaEntry";

function App(): JSX.Element {
  const storage = useContext(StorageContext);
  const [mangaList, setMangaList] = useState(defaultMangaList);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [editedMangaId, setEditedMangaId] = useState(-1);
  const [isMangaEditorOpened, setIsMangaEditorOpened] = useState(false);

  function updateManga(newManga: MangaEntry) {
    const newMangaList = updateMangaList(newManga, mangaList);
    setMangaList(newMangaList);
    setIsMangaEditorOpened(false);
  }

  function openMangaEditor(id: number) {
    setEditedMangaId(id);
    setIsMangaEditorOpened(true);
  }

  useEffect(() => {
    getStoredData(storage, setMangaList, setIsDataLoaded);
  }, []);

  useEffect(() => {
    if (!isDataLoaded) return;

    storeData(storage, mangaList);
  }, [mangaList]);

  return (
    <div id="App">
      <h1>manga-app</h1>
      <MangaList
        mangaList={mangaList}
        checkManga={(mangaEntry) => checkManga(mangaEntry, updateManga)}
        editManga={openMangaEditor}
        deleteManga={(mangaId) => deleteManga(mangaId, mangaList, setMangaList)}
      />
      <button onClick={() => openMangaEditor(-1)}>add entry</button>
      {isMangaEditorOpened ? (
        <MangaEditor
          mangaEntry={mangaList.entries[editedMangaId]}
          updateManga={updateManga}
          closeMangaEditor={() => setIsMangaEditorOpened(false)}
        />
      ) : null}
    </div>
  );
}

export default App;
