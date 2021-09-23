import React, { useContext, useEffect, useState } from "react";
import { StorageContext } from "..";
import "../scss/index.scss";
import MangaList from "./MangaList";
import MangaEditor from "./MangaEditor";
import { getStoredData, storeData } from "../helpers/storage";
import {
  deleteManga,
  defaultMangaList,
  updateMangaList,
} from "../helpers/mangaList";

function App(): JSX.Element {
  const storage = useContext(StorageContext);
  const [mangaList, setMangaList] = useState(defaultMangaList);
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
        updateManga={(newManga) => {
          const newMangaList = updateMangaList(newManga, mangaList);
          setMangaList(newMangaList);
          setEditedMangaId(-1);
        }}
      />
    </div>
  );
}

export default App;
