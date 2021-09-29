import { useContext, useEffect, useState } from "react";
import { StorageContext } from "..";
import "../scss/index.scss";
import MangaList from "./MangaList";
import MangaEditor from "./MangaEditor";
import { getStoredData, storeData } from "../helpers/storage";
import checkManga from "../helpers/checkManga";
import { defaultMangaList, MangaEntry } from "../helpers/constants";
import updateMangaList from "../helpers/updateMangaList";
import deleteManga from "../helpers/deleteManga";

function App(): JSX.Element {
  const storage = useContext(StorageContext);
  const [mangaList, setMangaList] = useState(defaultMangaList);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [editedMangaId, setEditedMangaId] = useState(-1);
  const [isMangaEditorOpen, setIsMangaEditorOpen] = useState(false);

  async function updateManga(newManga: MangaEntry) {
    setMangaList((mangaList) =>
      updateMangaList(newManga, mangaList, updateManga)
    );
    setIsMangaEditorOpen(false);
  }

  function openMangaEditor(id: number) {
    setEditedMangaId(id);
    setIsMangaEditorOpen(true);
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
      <div className="add-entry-button">
        <button onClick={() => openMangaEditor(-1)}>add entry</button>
      </div>
      <MangaList
        mangaList={mangaList}
        checkManga={(mangaEntry) => checkManga(mangaEntry, updateManga)}
        editManga={openMangaEditor}
        updateManga={updateManga}
        deleteManga={(mangaId) => deleteManga(mangaId, mangaList, setMangaList)}
      />
      {isMangaEditorOpen ? (
        <MangaEditor
          mangaEntry={mangaList.entries[editedMangaId]}
          updateManga={updateManga}
          closeMangaEditor={() => setIsMangaEditorOpen(false)}
        />
      ) : null}
    </div>
  );
}

export default App;
