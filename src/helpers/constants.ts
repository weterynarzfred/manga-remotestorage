enum MangaPropSlug {
  title = "title",
  read = "read",
}

type PropProps = {
  [key in MangaPropSlug]: {
    name: string;
    editable: boolean;
    defaultValue: string;
    transform?: (arg0: string) => string;
  };
};

const MANGA_PROP_SETTINGS: PropProps = {
  title: {
    name: "Title",
    editable: true,
    defaultValue: "",
  },
  read: {
    name: "Read",
    editable: true,
    defaultValue: "0",
    transform: (val) => parseFloat(val).toString(),
  },
};

export { MANGA_PROP_SETTINGS, MangaPropSlug };
