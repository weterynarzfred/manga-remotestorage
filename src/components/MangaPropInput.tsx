import {
  MangaProps,
  MANGA_PROP_SETTINGS,
  PropSettings,
  ProviderProps,
  PROVIDER_PROP_SETTINGS,
} from "../helpers/constants";
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
  let settings: PropSettings;
  if (props.provider === undefined) {
    settings = MANGA_PROP_SETTINGS[props.propSlug as keyof MangaProps];
  } else {
    settings = PROVIDER_PROP_SETTINGS[props.propSlug as keyof ProviderProps];
  }

  let input: JSX.Element;
  if (props.propSlug === "status") {
    input = (
      <select
        value={props.value}
        onChange={(event) =>
          props.setEditedProp(
            props.propSlug,
            event.target.value,
            props.provider
          )
        }
      >
        <option value="current">current</option>
        <option value="completed">completed</option>
        <option value="planned">planned</option>
        <option value="onHold">on hold</option>
        <option value="dropped">dropped</option>
      </select>
    );
  } else {
    input = (
      <input
        type="text"
        value={props.value}
        onChange={(event) =>
          props.setEditedProp(
            props.propSlug,
            event.target.value,
            props.provider
          )
        }
      />
    );
  }

  return (
    <div className="MangaPropInput">
      <label>
        <span className="manga-prop-input-label">{settings.name}:</span>
        {input}
      </label>
    </div>
  );
}

export default MangaPropInput;
