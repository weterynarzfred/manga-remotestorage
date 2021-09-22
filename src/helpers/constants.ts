enum MangaPropSlug {
  id = "id",
  title = "title",
  read = "read",
}

type MangaProps = {
  [key in MangaPropSlug]?: string;
};

type PropProps = {
  [key in MangaPropSlug]: {
    name: string;
    editable: boolean;
    defaultValue: string;
  };
};

const MANGA_PROPS: PropProps = {
  id: {
    name: "ID",
    editable: false,
    defaultValue: "-1",
  },
  title: {
    name: "Title",
    editable: true,
    defaultValue: "",
  },
  read: {
    name: "Read",
    editable: true,
    defaultValue: "0",
  },
};

export { MANGA_PROPS, MangaPropSlug };
export type { MangaProps };
