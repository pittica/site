const { getImage } = require("gatsby-plugin-image")

function getSeoImage(post) {
  if (post) {
    let image = null

    if (post.seoImage && post.seoImage.localFile) {
      image = getImage(post.seoImage.localFile.childImageSharp)
    } else if (post.seoImageFallback && post.seoImageFallback.localFile) {
      image = getImage(post.seoImageFallback.localFile.childImageSharp)
    }

    return image ? image.images.fallback.src : null
  } else {
    return null
  }
}

function getCover(post) {
  if (post) {
    return post.image && post.image.localFile
      ? getImage(post.image.localFile.childImageSharp)
      : null
  } else {
    return null
  }
}

function getCoverFallback(post) {
  const image = getCover(post)

  return image ? image.images.fallback.src : null
}

exports.getSeoImage = getSeoImage
exports.getCover = getCover
exports.getCoverFallback = getCoverFallback
