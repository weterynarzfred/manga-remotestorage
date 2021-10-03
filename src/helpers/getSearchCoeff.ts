import stringSimilarity from "string-similarity";
import { MangaEntry } from "./constants";
import getProp from "./getProp";

function getSearchCoeff(search: string, manga: MangaEntry): number {
  if (search === "") return 1;

  const title = getProp(manga, "title").toLowerCase();
  const searchString = search.toLowerCase();

  const foundExact = title.search(searchString) >= 0;
  const similarity = stringSimilarity.compareTwoStrings(searchString, title);
  return (similarity + (foundExact ? 0.3 : 0)) / searchString.length;
}

export default getSearchCoeff;
