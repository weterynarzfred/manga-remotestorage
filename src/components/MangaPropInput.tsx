import React from "react";
import { MangaPropSlug, MANGA_PROP_SETTINGS } from "../helpers/constants";

type MangaPropInputProps = {
  propSlug: MangaPropSlug;
  value: string;
  setMangaProp: (arg0: MangaPropSlug, arg1: string) => void;
};

function MangaPropInput(props: MangaPropInputProps): JSX.Element {
  return (
    <div className="MangaPropInput">
      <label>
        <span className="manga-prop-input-label">
          {MANGA_PROP_SETTINGS[props.propSlug].name}:
        </span>
        <input
          type="text"
          value={props.value}
          onChange={(event) =>
            props.setMangaProp(props.propSlug, event.target.value)
          }
        />
      </label>
    </div>
  );
}

export default MangaPropInput;
