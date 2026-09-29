export type GalleryItem = {
  _id: string;
  title?: string;
  mediaType: "image" | "video";
  src: string;
  poster?: string;
  aspectRatio: number;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  lqip?: string;
  tags?: string[];
};

export type GalleryItemInstance = GalleryItem & {
  instanceId: string;
  loopIndex: number;
};
