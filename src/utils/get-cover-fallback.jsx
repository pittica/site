import { getImage } from "gatsby-plugin-image"

export default function getCoverFallback(post) {
  if (post) {
    const image =
      post.image && post.image.localFile
        ? getImage(post.image.localFile.childImageSharp)
        : null
    return image ? image.images.fallback.src : null
  } else {
    return null
  }
}
