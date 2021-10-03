import { MangaEntryList } from "../helpers/constants";

type FiltersProps = {
  filters: MangaEntryList["settings"]["filters"];
  setSetting: (arg0: string, arg1: string | number | boolean) => void;
};

function Filters(props: FiltersProps): JSX.Element {
  return (
    <div id="Filters">
      <div id="status-filter" className="filter-group">
        satatus is
        <select
          value={props.filters.statusFilter}
          onChange={(event) =>
            props.setSetting("filters.statusFilter", event.target.value)
          }
        >
          <option value="any">all</option>
          <option value="current">current</option>
          <option value="completed">completed</option>
          <option value="planned">planned</option>
          <option value="onHold">on hold</option>
          <option value="dropped">dropped</option>
        </select>
      </div>
      <div id="unread-filter" className="filter-group">
        <input
          type="checkbox"
          checked={props.filters.advancedFilters.unread.active}
          onChange={(event) =>
            props.setSetting(
              "filters.advancedFilters.unread.active",
              event.target.checked
            )
          }
        />
        unread is
        <select
          value={props.filters.advancedFilters.unread.isMore ? "more" : "less"}
          onChange={(event) =>
            props.setSetting(
              "filters.advancedFilters.unread.isMore",
              event.target.value === "more"
            )
          }
        >
          <option value="more">more</option>
          <option value="less">less</option>
        </select>
        than
        <input
          type="number"
          value={props.filters.advancedFilters.unread.value}
          onChange={(event) =>
            props.setSetting(
              "filters.advancedFilters.unread.value",
              event.target.value
            )
          }
        />
      </div>
    </div>
  );
}

export default Filters;
