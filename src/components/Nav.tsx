import checkMangaList from "../helpers/checkMangaList";
import { MangaEntry, MangaEntryList } from "../helpers/constants";
import "../scss/nav.scss";

type NavProps = {
  mangaList: MangaEntryList;
  updateManga: (arg0: MangaEntry) => void;
  openMangaEditor: (arg0: number) => void;
  filters: {
    search: string;
    setSearch: (arg0: string) => void;
  };
};

function Nav(props: NavProps): JSX.Element {
  return (
    <nav>
      <div className="top-buttons">
        <button
          onClick={() => checkMangaList(props.mangaList, props.updateManga)}
        >
          update all
        </button>
        <button onClick={() => props.openMangaEditor(-1)}>add entry</button>
        <div id="top-search-wrap">
          <input
            type="text"
            name="search"
            value={props.filters.search}
            onChange={(event) => props.filters.setSearch(event.target.value)}
            placeholder="search"
            autoComplete="off"
          />
          {props.filters.search === "" ? null : (
            <svg
              className="clear-input"
              viewBox="0 0 100 100"
              onClick={() => props.filters.setSearch("")}
            >
              <path d="M10 10L90 90M90 10L10 90" />
            </svg>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
