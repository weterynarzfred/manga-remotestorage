import { PROVIDERS } from "./providers";

type PropSettings<T extends MangaProps | ProviderProps, K extends keyof T> = {
  name: string;
  editable: boolean;
  defaultValue: T[K];
  type: "number" | "string";
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
  title: string;
  read: number;
  ready: number;
  status: StatusTypes;
  score: number;
};

type MangaPropSettings = {
  [key in keyof MangaProps]: PropSettings<MangaProps, key>;
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
  },
  ready: {
    name: "Ready",
    editable: true,
    defaultValue: 0,
    type: "number",
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
  },
};

type ProviderProps = {
  id: string;
  title: string;
  cover: string;
  ready: number;
  lastCheck: number;
  lastInfoCheck: number;
  lastUpdate: number;
};

type ProviderPropSettings = {
  [key in keyof ProviderProps]: PropSettings<ProviderProps, key>;
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
  lastUpdate: {
    name: "Last Update",
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
    hasErrors?: boolean;
  };
};

type AdvancedFilters = {
  toggle: boolean;
  unread: { active: boolean; isMore: boolean; value: number };
  lastUpdate: { active: boolean; isMore: boolean; value: number };
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
        lastUpdate: { active: false, isMore: true, value: 0 },
      },
    },
  },
  entries: {},
};

const defaultManga: MangaEntry = {
  id: -1,
  props: {
    title: MANGA_PROP_SETTINGS.title.defaultValue,
    read: MANGA_PROP_SETTINGS.read.defaultValue,
    ready: MANGA_PROP_SETTINGS.ready.defaultValue,
    status: MANGA_PROP_SETTINGS.status.defaultValue,
    score: MANGA_PROP_SETTINGS.score.defaultValue,
  },
  providers: {},
  temp: {},
};

const PROVIDER_INFO_INTERVAL = 1000 * 60 * 60 * 24 * 30;

export {
  MANGA_PROP_SETTINGS,
  PROVIDER_PROP_SETTINGS,
  PROVIDER_INFO_INTERVAL,
  STATUS_LIST,
  defaultMangaList,
  defaultManga,
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
