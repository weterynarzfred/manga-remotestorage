import { MangaEntry, MangaEntryList } from "./constants";
import getProp from "./getProp";

function filterEntries(
  manga: MangaEntry,
  searchCoeff: number,
  filters: MangaEntryList["settings"]["filters"]
): boolean {
  if (searchCoeff < 0.03) return false;

  if (filters.statusFilter !== "any") {
    if (getProp(manga, "status") !== filters.statusFilter) return false;
  }

  if (filters.advancedFilters.toggle) {
    if (filters.advancedFilters.unread.active) {
      const unread = getProp(manga, "unread");
      if (filters.advancedFilters.unread.isMore) {
        if (unread <= filters.advancedFilters.unread.value) return false;
      } else {
        if (unread >= filters.advancedFilters.unread.value) return false;
      }
    }

    if (filters.advancedFilters.lastUpdate.active) {
      const lastUpdate = getProp(manga, "lastUpdate");
      const currentTimestamp = new Date().getTime();
      const miliseconds =
        filters.advancedFilters.lastUpdate.value * 1000 * 60 * 60 * 24;
      if (filters.advancedFilters.lastUpdate.isMore) {
        if (lastUpdate + miliseconds >= currentTimestamp) return false;
      } else {
        if (lastUpdate + miliseconds <= currentTimestamp) return false;
      }
    }
  }

  return true;
}

export default filterEntries;
