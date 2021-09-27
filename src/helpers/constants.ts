import { PROVIDERS } from "./providers";

type PropSettings = {
  name: string;
  editable: boolean;
  defaultValue: string | number;
  type: "number" | "string";
  transform?: (arg0: string | number) => string | number;
};

type MangaProps = {
  title: string | undefined;
  read: number | undefined;
  ready: number | undefined;
};

type MangaPropSettings = {
  [key in keyof MangaProps]: PropSettings;
};

const MANGA_PROP_SETTINGS: MangaPropSettings = {
  title: {
    name: "Title",
    editable: true,
    defaultValue: "",
    type: "string",
  },
  read: {
    name: "Read",
    editable: true,
    defaultValue: 0,
    type: "number",
    transform: (val) => {
      if (typeof val === "number") return val;
      const result = parseFloat(val);
      return isNaN(result) ? "" : result;
    },
  },
  ready: {
    name: "Ready",
    editable: true,
    defaultValue: 0,
    type: "number",
    transform: (val) => {
      if (typeof val === "number") return val;
      const result = parseFloat(val);
      return isNaN(result) ? "" : result;
    },
  },
};

type ProviderProps = {
  id: string | undefined;
  title: string | undefined;
  cover: string | undefined;
  ready: number | undefined;
  lastCheck: number | undefined;
  lastInfoCheck: number | undefined;
};

type ProviderPropSettings = {
  [key in keyof ProviderProps]: PropSettings;
};

const PROVIDER_PROP_SETTINGS: ProviderPropSettings = {
  id: {
    name: "ID",
    editable: true,
    defaultValue: "",
    type: "string",
  },
  title: {
    name: "Title",
    editable: true,
    defaultValue: "",
    type: "string",
  },
  cover: {
    name: "Cover",
    editable: false,
    defaultValue: "",
    type: "string",
  },
  ready: {
    name: "Ready",
    editable: true,
    defaultValue: 0,
    type: "number",
    transform: (val) => {
      if (typeof val === "number") return val;
      const result = parseFloat(val);
      return isNaN(result) ? "" : result;
    },
  },
  lastCheck: {
    name: "Last Check",
    editable: false,
    defaultValue: 0,
    type: "number",
  },
  lastInfoCheck: {
    name: "Last Check",
    editable: false,
    defaultValue: 0,
    type: "number",
  },
};

type MangaPropPath =
  | `providers.${keyof typeof PROVIDERS}.${keyof ProviderProps}`
  | `props.${keyof MangaProps}`;

type MangaEntry = {
  id: number;
  props: MangaProps;
  providers: {
    [key in keyof typeof PROVIDERS]?: ProviderProps;
  };
};

type MangaEntryList = {
  settings: {
    nextEntryId: number;
  };
  entries: {
    [key: string]: MangaEntry;
  };
};

const defaultMangaList: MangaEntryList = {
  settings: {
    nextEntryId: 1,
  },
  entries: {},
};

const PROVIDER_INFO_INTERVAL = 1000 * 60 * 60 * 24 * 30;

export {
  MANGA_PROP_SETTINGS,
  PROVIDER_PROP_SETTINGS,
  PROVIDER_INFO_INTERVAL,
  defaultMangaList,
};

export type {
  MangaProps,
  ProviderProps,
  PropSettings,
  MangaPropPath,
  MangaEntry,
  MangaEntryList,
};
