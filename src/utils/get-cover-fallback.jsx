import getCover from "./get-cover"

export default function getCoverFallback(post) {
  const image = getCover(post)

  return image ? image.images.fallback.src : null
}
