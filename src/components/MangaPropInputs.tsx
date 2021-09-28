import {
  MangaEntry,
  MangaProps,
  MANGA_PROP_SETTINGS,
  ProviderProps,
  PROVIDER_PROP_SETTINGS,
} from "../helpers/constants";
import { PROVIDERS } from "../helpers/providers";
import MangaPropInput from "./MangaPropInput";

type MangaPropInputsProps = {
  editedMangaEntry: MangaEntry;
  setEditedProp: (
    key: keyof MangaProps | keyof ProviderProps,
    value: string,
    provider?: keyof typeof PROVIDERS
  ) => void;
  buttonElements: JSX.Element;
};

function MangaPropInputs(props: MangaPropInputsProps): JSX.Element {
  // TODO: refactor emphasizedInputs
  const emphasizedInputs = [] as JSX.Element[];
  emphasizedInputs.push(
    <MangaPropInput
      key="read"
      propSlug="read"
      value={props.editedMangaEntry.props?.read || ""}
      setEditedProp={props.setEditedProp}
    />
  );

  emphasizedInputs.push(
    <MangaPropInput
      key="status"
      propSlug="status"
      value={props.editedMangaEntry.props?.status || ""}
      setEditedProp={props.setEditedProp}
    />
  );

  emphasizedInputs.push(
    <MangaPropInput
      key="mangadex-id"
      propSlug="id"
      value={props.editedMangaEntry.providers?.mangadex?.id || ""}
      setEditedProp={props.setEditedProp}
      provider="mangadex"
      label="mangadex id"
    />
  );

  const propInputs = [] as JSX.Element[];
  let propSlug: keyof typeof MANGA_PROP_SETTINGS;
  for (propSlug in MANGA_PROP_SETTINGS) {
    if (!MANGA_PROP_SETTINGS[propSlug].editable) continue;
    if (["read", "status"].includes(propSlug)) continue;

    propInputs.push(
      <MangaPropInput
        key={propSlug}
        propSlug={propSlug}
        value={props.editedMangaEntry.props?.[propSlug] || ""}
        setEditedProp={props.setEditedProp}
      />
    );
  }

  const providerElements = [] as JSX.Element[];
  let providerSlug: keyof typeof PROVIDERS;
  for (providerSlug in PROVIDERS) {
    const providerInputs: Array<JSX.Element> = [];

    let propSlug: keyof typeof PROVIDER_PROP_SETTINGS;
    for (propSlug in PROVIDER_PROP_SETTINGS) {
      if (!PROVIDER_PROP_SETTINGS[propSlug].editable) continue;
      if (propSlug === "id") continue;

      providerInputs.push(
        <MangaPropInput
          key={propSlug}
          propSlug={propSlug}
          value={
            props.editedMangaEntry.providers?.[providerSlug]?.[propSlug] || ""
          }
          setEditedProp={props.setEditedProp}
          provider={providerSlug}
        />
      );
    }

    providerElements.push(
      <div className="provider-inputs" key={providerSlug}>
        <div className="provider-name">{PROVIDERS[providerSlug].name}</div>
        {providerInputs}
      </div>
    );
  }

  return (
    <>
      <div className="emphasized-inputs">{emphasizedInputs}</div>
      {props.buttonElements}
      <div className="provider-name">Manual</div>
      {propInputs}
      {providerElements}
    </>
  );
}

export default MangaPropInputs;
