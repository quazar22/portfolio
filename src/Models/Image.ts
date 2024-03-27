export type ImageType = {
  collectionId: string;
  collectionName: string;
  id: string;
  title: string;
  image: string[];
  description: string;
  project_id: string;
}

export type ImageData = {
  images: ImageType[];
  endpoint: string;
}