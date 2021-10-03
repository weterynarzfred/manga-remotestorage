import {
  MangaEntry,
  MangaProps,
  MANGA_PROP_SETTINGS,
  ProviderProps,
  PROVIDER_PROP_SETTINGS,
} from "../../helpers/constants";
import { PROVIDERS } from "../../helpers/providers";
import MangaPropInput from "./MangaPropInput";

type MangaPropInputsProps = {
  editedMangaEntry: MangaEntry;
  setEditedProp: (
    key: keyof MangaProps | keyof ProviderProps,
    value: string,
    provider?: keyof typeof PROVIDERS
  ) => void;
  closeMangaEditor: () => void;
  isNew: boolean;
};

function MangaPropInputs(props: MangaPropInputsProps): JSX.Element {
  const emphasizedInputs = [] as JSX.Element[];
  const propInputs = [] as JSX.Element[];
  const providerElements = [] as JSX.Element[];

  let propSlug: keyof typeof MANGA_PROP_SETTINGS;
  for (propSlug in MANGA_PROP_SETTINGS) {
    if (!MANGA_PROP_SETTINGS[propSlug].editable) continue;

    const input = (
      <MangaPropInput
        key={propSlug}
        propSlug={propSlug}
        value={props.editedMangaEntry.props?.[propSlug] || ""}
        setEditedProp={props.setEditedProp}
      />
    );

    if (["read", "status"].includes(propSlug)) emphasizedInputs.push(input);
    else propInputs.push(input);
  }

  let providerSlug: keyof typeof PROVIDERS;
  for (providerSlug in PROVIDERS) {
    const providerInputs: Array<JSX.Element> = [];

    let propSlug: keyof typeof PROVIDER_PROP_SETTINGS;
    for (propSlug in PROVIDER_PROP_SETTINGS) {
      if (!PROVIDER_PROP_SETTINGS[propSlug].editable) continue;

      const input = (
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

      if (propSlug === "id") emphasizedInputs.push(input);
      else providerInputs.push(input);
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
      <div className="manga-editor-buttons">
        <button>{props.isNew ? "add" : "save"}</button>
        <button
          onClick={(event) => {
            event.preventDefault();
            props.closeMangaEditor();
          }}
        >
          cancel
        </button>
      </div>
      <div className="provider-name">Manual</div>
      {propInputs}
      {providerElements}
    </>
  );
}

export default MangaPropInputs;
