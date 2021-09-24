import { PROVIDERS } from "./providers";

type PropSettings = {
  name: string;
  editable: boolean;
  defaultValue: string;
  transform?: (arg0: string) => string;
};

enum MangaPropSlug {
  title = "title",
  read = "read",
}

type MangaPropSettings = {
  [key in MangaPropSlug]: PropSettings;
};

const MANGA_PROP_SETTINGS: MangaPropSettings = {
  title: {
    name: "Title",
    editable: true,
    defaultValue: "",
  },
  read: {
    name: "Read",
    editable: true,
    defaultValue: "0",
    transform: (val) => {
      const result = parseFloat(val);
      return isNaN(result) ? "" : result.toString();
    },
  },
};

enum ProviderPropSlug {
  id = "id",
  title = "title",
  ready = "ready",
}

type ProviderPropSettings = {
  [key in ProviderPropSlug]: PropSettings;
};

const PROVIDER_PROP_SETTINGS: ProviderPropSettings = {
  id: {
    name: "ID",
    editable: true,
    defaultValue: "",
  },
  title: {
    name: "Title",
    editable: true,
    defaultValue: "",
  },
  ready: {
    name: "Ready",
    editable: true,
    defaultValue: "0",
    transform: (val) => {
      const result = parseFloat(val);
      return isNaN(result) ? "" : result.toString();
    },
  },
};

type MangaPropPath =
  | `providers.${keyof typeof PROVIDERS}.${ProviderPropSlug}`
  | `props.${MangaPropSlug}`;

export {
  MANGA_PROP_SETTINGS,
  MangaPropSlug,
  PROVIDER_PROP_SETTINGS,
  ProviderPropSlug,
};

export type { PropSettings, MangaPropPath };
