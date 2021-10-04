import { PROVIDERS } from "./providers";

type PropSettings = {
  name: string;
  editable: boolean;
  defaultValue: string | number;
  type: "number" | "string";
  transform?: (arg0: string | number) => string | number;
};

const STATUS_LIST = {
  current: "Current",
  completed: "Completed",
  planned: "Planned",
  onHold: "On Hold",
  dropped: "Dropped",
};

type StatusTypes = keyof typeof STATUS_LIST;

type MangaProps = {
  title: string | undefined;
  read: number | undefined;
  ready: number | undefined;
  status: StatusTypes | undefined;
  score: number | undefined;
  lastUpdate: number | undefined;
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
  status: {
    name: "Status",
    editable: true,
    defaultValue: "current",
    type: "string",
  },
  score: {
    name: "Score",
    editable: false,
    defaultValue: 0,
    type: "number",
    transform: (val) => {
      if (typeof val === "number") return val;
      const result = parseFloat(val);
      return isNaN(result) ? "" : result;
    },
  },
  lastUpdate: {
    name: "Last Update",
    editable: false,
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
  temp: {
    isChecking?: boolean;
    isUpdated?: boolean;
  };
};

type AdvancedFilters = {
  toggle: boolean;
  unread: { active: boolean; isMore: boolean; value: number };
};

type MangaEntryList = {
  settings: {
    nextEntryId: number;
    filters: {
      search: string;
      statusFilter: StatusTypes | "any";
      advancedFilters: AdvancedFilters;
    };
  };
  entries: {
    [key: string]: MangaEntry;
  };
};

const defaultMangaList: MangaEntryList = {
  settings: {
    nextEntryId: 1,
    filters: {
      search: "",
      statusFilter: "any",
      advancedFilters: {
        toggle: false,
        unread: { active: false, isMore: true, value: 0 },
      },
    },
  },
  entries: {},
};

const PROVIDER_INFO_INTERVAL = 1000 * 60 * 60 * 24 * 30;

export {
  MANGA_PROP_SETTINGS,
  PROVIDER_PROP_SETTINGS,
  PROVIDER_INFO_INTERVAL,
  defaultMangaList,
  STATUS_LIST,
};

export type {
  MangaProps,
  ProviderProps,
  PropSettings,
  MangaPropPath,
  MangaEntry,
  MangaEntryList,
  StatusTypes,
  AdvancedFilters,
};
