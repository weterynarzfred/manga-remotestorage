import { MangaEntryList } from "../helpers/constants";

type FiltersProps = {
  filters: MangaEntryList["settings"]["filters"];
  setSetting: (arg0: string, arg1: string | number | boolean) => void;
};

function Filters(props: FiltersProps): JSX.Element {
  return (
    <div id="Filters">
      <div id="status-filter" className="filter-group">
        <span>status is</span>
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

      <div id="advanced-filet-toggle" className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={props.filters.advancedFilters.toggle}
            onChange={(event) =>
              props.setSetting(
                "filters.advancedFilters.toggle",
                event.target.checked
              )
            }
          />
          <span>advanced filters</span>
        </label>
      </div>

      {props.filters.advancedFilters.toggle ? (
        <div id="advanced-filters">
          <div id="unread-filter" className="filter-group">
            <label>
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
              <span>unread is</span>
            </label>
            <select
              value={
                props.filters.advancedFilters.unread.isMore ? "more" : "less"
              }
              onChange={(event) => {
                props.setSetting(
                  "filters.advancedFilters.unread.isMore",
                  event.target.value === "more"
                );
                props.setSetting("filters.advancedFilters.unread.active", true);
              }}
            >
              <option value="more">more</option>
              <option value="less">less</option>
            </select>
            <span>than</span>
            <input
              type="number"
              value={props.filters.advancedFilters.unread.value}
              onChange={(event) => {
                props.setSetting(
                  "filters.advancedFilters.unread.value",
                  event.target.value
                );
                props.setSetting("filters.advancedFilters.unread.active", true);
              }}
            />
          </div>

          <div id="last-update-filter" className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={props.filters.advancedFilters.lastUpdate.active}
                onChange={(event) =>
                  props.setSetting(
                    "filters.advancedFilters.lastUpdate.active",
                    event.target.checked
                  )
                }
              />
              <span>last update was</span>
            </label>
            <select
              value={
                props.filters.advancedFilters.lastUpdate.isMore
                  ? "more"
                  : "less"
              }
              onChange={(event) => {
                props.setSetting(
                  "filters.advancedFilters.lastUpdate.isMore",
                  event.target.value === "more"
                );
                props.setSetting(
                  "filters.advancedFilters.lastUpdate.active",
                  true
                );
              }}
            >
              <option value="more">more</option>
              <option value="less">less</option>
            </select>
            <span>than</span>
            <input
              type="number"
              value={props.filters.advancedFilters.lastUpdate.value}
              onChange={(event) => {
                props.setSetting(
                  "filters.advancedFilters.lastUpdate.value",
                  event.target.value
                );
                props.setSetting(
                  "filters.advancedFilters.lastUpdate.active",
                  true
                );
              }}
            />
            <span>days ago</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Filters;
