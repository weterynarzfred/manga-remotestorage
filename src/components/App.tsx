import React, { useContext, useEffect, useState } from "react";
import { StorageContext } from "..";
import "../scss/index.scss";
import MangaList from "./MangaList";
import MangaEditor from "./MangaEditor";
import { getStoredData, storeData } from "../helpers/storage";
import { deleteManga, emptyMangaList, updateManga } from "../helpers/mangaList";

function App(): JSX.Element {
  const storage = useContext(StorageContext);
  const [mangaList, setMangaList] = useState(emptyMangaList);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [editedMangaId, setEditedMangaId] = useState(-1);

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
        deleteManga={(mangaId) => deleteManga(mangaId, mangaList, setMangaList)}
        editManga={setEditedMangaId}
      />
      <MangaEditor
        mangaEntry={mangaList.entries[editedMangaId]}
        updateManga={(newManga) =>
          updateManga(newManga, mangaList, setMangaList)
        }
      />
    </div>
  );
}

export default App;
