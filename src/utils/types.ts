export type Project = {
  title: string,
  link: string | null,
  date: string,
  gallery: Image[],
  tags: Tag[],
  description: string[]
}

    type Tag = {
    title: string,
    class: string
    }

export type Image = {
  url: string;
  orientation: "landscape" | "portrait" | "square";
}