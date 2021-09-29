import classNames from "classnames";
import { deepClone } from "../helpers/deepClone";
import { MangaEntry } from "../helpers/constants";
import getProp from "../helpers/getProp";

type MangaScoreProps = {
  mangaEntry: MangaEntry;
  updateManga: (arg0: MangaEntry) => void;
};

function MangaScore(props: MangaScoreProps): JSX.Element {
  const scoreElements = [] as JSX.Element[];
  const score = getProp(props.mangaEntry, "score");
  for (let i = 0; i < 6; i++) {
    scoreElements.push(
      <svg
        viewBox="0 0 4.03 4.03"
        key={i}
        className={classNames("star", { marked: i <= score })}
        onClick={() => {
          const newMangaEntry = deepClone(props.mangaEntry);
          newMangaEntry.props.score = i;
          props.updateManga(newMangaEntry);
        }}
      >
        {i === 0 ? (
          <circle cx="2.015" cy="2.1" r="0.7" />
        ) : (
          <path d="M2.59 3.23l-0.47 -0.29c-0.07,-0.04 -0.14,-0.04 -0.21,0l-0.47 0.29c-0.07,0.05 -0.16,0.04 -0.22,-0.01 -0.07,-0.05 -0.1,-0.13 -0.08,-0.21l0.13 -0.53c0.02,-0.08 -0.01,-0.15 -0.07,-0.2l-0.42 -0.36c-0.06,-0.05 -0.08,-0.14 -0.06,-0.22 0.03,-0.07 0.1,-0.13 0.18,-0.13l0.55 -0.04c0.08,-0.01 0.14,-0.06 0.17,-0.13l0.21 -0.51c0.03,-0.08 0.1,-0.12 0.18,-0.12 0.09,0 0.16,0.04 0.19,0.12l0.21 0.51c0.03,0.07 0.09,0.12 0.17,0.13l0.55 0.04c0.08,0 0.15,0.06 0.18,0.13 0.02,0.08 0,0.17 -0.06,0.22l-0.43 0.36c-0.06,0.05 -0.08,0.12 -0.06,0.2l0.13 0.53c0.02,0.08 -0.01,0.16 -0.08,0.21 -0.06,0.05 -0.15,0.06 -0.22,0.01z" />
        )}
      </svg>
    );
  }

  return <div className="MangaScore">{scoreElements}</div>;
}

export default MangaScore;
