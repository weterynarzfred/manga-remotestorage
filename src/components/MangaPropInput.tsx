import {
  MangaPropSlug,
  MANGA_PROP_SETTINGS,
  PropSettings,
  ProviderPropSlug,
  PROVIDERS,
  PROVIDER_PROP_SETTINGS,
} from "../helpers/constants";

type MangaPropInputProps = {
  propSlug: MangaPropSlug | ProviderPropSlug;
  value: string;
  setEditedProp: (
    key: ProviderPropSlug | MangaPropSlug,
    value: string,
    provider?: keyof typeof PROVIDERS
  ) => void;
  provider?: keyof typeof PROVIDERS;
};

function MangaPropInput(props: MangaPropInputProps): JSX.Element {
  let settings: PropSettings;
  if (props.provider === undefined) {
    settings = MANGA_PROP_SETTINGS[props.propSlug as MangaPropSlug];
  } else {
    settings = PROVIDER_PROP_SETTINGS[props.propSlug as ProviderPropSlug];
  }

  return (
    <div className="MangaPropInput">
      <label>
        <span className="manga-prop-input-label">{settings.name}:</span>
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
      </label>
    </div>
  );
}

export default MangaPropInput;
