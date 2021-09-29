import { ChangeEvent } from "react";
import { MangaProps, ProviderProps } from "../helpers/constants";
import getPropSettings from "../helpers/getPropSettings";
import { PROVIDERS } from "../helpers/providers";

type MangaPropInputProps = {
  propSlug: keyof MangaProps | keyof ProviderProps;
  value: string | number;
  setEditedProp: (
    key: keyof MangaProps | keyof ProviderProps,
    value: string,
    provider?: keyof typeof PROVIDERS
  ) => void;
  provider?: keyof typeof PROVIDERS;
};

function MangaPropInput(props: MangaPropInputProps): JSX.Element {
  const settings = getPropSettings(
    props.propSlug,
    props.provider !== undefined
  );

  function handleChange(
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    props.setEditedProp(props.propSlug, event.target.value, props.provider);
  }

  let input: JSX.Element;
  if (props.propSlug === "status") {
    input = (
      <select value={props.value} onChange={handleChange}>
        <option value="current">current</option>
        <option value="completed">completed</option>
        <option value="planned">planned</option>
        <option value="onHold">on hold</option>
        <option value="dropped">dropped</option>
      </select>
    );
  } else {
    input = <input type="text" value={props.value} onChange={handleChange} />;
  }

  let label = settings.name;
  if (settings.name === "ID" && props.provider !== undefined) {
    label = `${PROVIDERS[props.provider].name} ${label}`;
  }

  return (
    <div className="MangaPropInput">
      <label>
        <span className="manga-prop-input-label">{label}:</span>
        {input}
      </label>
    </div>
  );
}

export default MangaPropInput;
