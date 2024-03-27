export type ProjectType = {
  collectionId: string;
  collectionName: string;
  id: string;
  title: string;
  description: string;
  links: Link[];
  experience_chips: string[];
}

export class Link {
  title: string;
  text: string;
  url: string;
  is_github: boolean;

  constructor(title: string, text: string, url: string, is_github: boolean) {
    this.title = title;
    this.text = text;
    this.url = url;
    this.is_github = is_github;
  }
}