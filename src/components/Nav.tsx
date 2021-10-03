import checkMangaList from "../helpers/checkMangaList";
import { MangaEntry, MangaEntryList } from "../helpers/constants";
import "../scss/nav.scss";

type NavProps = {
  mangaList: MangaEntryList;
  setSetting: (arg0: string, arg1: string | number | boolean) => void;
  updateManga: (arg0: MangaEntry) => void;
  openMangaEditor: (arg0: number) => void;
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
            value={props.mangaList.settings.filters.search}
            onChange={(event) =>
              props.setSetting("filters.search", event.target.value)
            }
            placeholder="search"
            autoComplete="off"
          />
          {props.mangaList.settings.filters.search === "" ? null : (
            <svg
              className="clear-input"
              viewBox="0 0 100 100"
              onClick={() => props.setSetting("filters.search", "")}
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
