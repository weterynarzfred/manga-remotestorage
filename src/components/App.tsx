import BaseClient from "remotestoragejs/release/types/baseclient";

import React, { useContext, useEffect, useState } from "react";
import { StorageContext } from "..";
import "../scss/index.scss";
import MangaList from "./MangaList";
import MangaEditor from "./MangaEditor";

type MangaEntry = {
  id: number;
  title: string;
  read: number;
};

type MangaEntryList = {
  settings: {
    nextEntryId: number;
  };
  entries: {
    [key: number]: MangaEntry;
  };
};

const emptyMangaList: MangaEntryList = {
  settings: {
    nextEntryId: 3,
  },
  entries: {},
};

async function storeData(storage: BaseClient, mangaList: MangaEntryList) {
  await storage.storeFile(
    "application/json",
    "mangalist.json",
    JSON.stringify(mangaList)
  );
  console.log("storeData", mangaList);
}

async function getStoredData(
  storage: BaseClient,
  setMangaList: (arg0: MangaEntryList) => void,
  setIsDataLoaded: (arg0: boolean) => void
) {
  const content = (await storage.getFile("mangalist.json")) as {
    contentType: string;
    data: string;
  };

  if (content.data !== undefined) {
    setMangaList(JSON.parse(content.data));
  }
  setIsDataLoaded(true);
}

function App(): JSX.Element {
  const storage = useContext(StorageContext);
  const [mangaList, setMangaList] = useState(emptyMangaList);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [editedMangaId, setEditedMangaId] = useState(-1);

  function updateManga(newManga: MangaEntry) {
    const newMangaList = JSON.parse(JSON.stringify(mangaList));
    if (newManga.id === -1) newManga.id = newMangaList.settings.nextEntryId++;
    newMangaList.entries[newManga.id] = newManga;
    setMangaList(newMangaList);
  }

  function deleteManga(mangaId: number) {
    const newMangaList = JSON.parse(JSON.stringify(mangaList));
    console.log("deleteManga", mangaId);

    delete newMangaList.entries[mangaId];
    setMangaList(newMangaList);
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
        deleteManga={deleteManga}
        editManga={setEditedMangaId}
      />
      <MangaEditor
        mangaEntry={mangaList.entries[editedMangaId]}
        updateManga={updateManga}
      />
    </div>
  );
}

export default App;
export type { MangaEntryList, MangaEntry };
