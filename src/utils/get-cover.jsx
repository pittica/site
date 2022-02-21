import { getImage } from "gatsby-plugin-image"

export default function getCover(post) {
  if (post) {
    return post.image && post.image.localFile
      ? getImage(post.image.localFile.childImageSharp)
      : null
  } else {
    return null
  }
}
