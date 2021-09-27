import {
  MangaProps,
  MANGA_PROP_SETTINGS,
  ProviderProps,
  PROVIDER_PROP_SETTINGS,
} from "../helpers/constants";
import { MangaEntry } from "../helpers/mangaList";
import { PROVIDERS } from "../helpers/providers";
import MangaPropInput from "./MangaPropInput";

type MangaPropInputsProps = {
  editedMangaEntry: MangaEntry;
  setEditedProp: (
    key: keyof MangaProps | keyof ProviderProps,
    value: string,
    provider?: keyof typeof PROVIDERS
  ) => void;
};

function MangaPropInputs(props: MangaPropInputsProps): JSX.Element {
  const propInputs: Array<JSX.Element> = [];
  let propSlug: keyof typeof MANGA_PROP_SETTINGS;
  for (propSlug in MANGA_PROP_SETTINGS) {
    if (!MANGA_PROP_SETTINGS[propSlug].editable) continue;

    propInputs.push(
      <MangaPropInput
        key={propSlug}
        propSlug={propSlug}
        value={props.editedMangaEntry.props?.[propSlug] || ""}
        setEditedProp={props.setEditedProp}
      />
    );
  }

  const providerElements: Array<JSX.Element> = [];
  let providerSlug: keyof typeof PROVIDERS;
  for (providerSlug in PROVIDERS) {
    const providerInputs: Array<JSX.Element> = [];

    let propSlug: keyof typeof PROVIDER_PROP_SETTINGS;
    for (propSlug in PROVIDER_PROP_SETTINGS) {
      if (!PROVIDER_PROP_SETTINGS[propSlug].editable) continue;

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
      {propInputs}
      {providerElements}
    </>
  );
}

export default MangaPropInputs;
