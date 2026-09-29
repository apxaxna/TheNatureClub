import createImageUrlBuilder from "@sanity/image-url"
import { projectId, dataset } from "./client"

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
})

export const urlForImage = (source: unknown) => {
  return imageBuilder.image(source as Parameters<typeof imageBuilder.image>[0])
}
