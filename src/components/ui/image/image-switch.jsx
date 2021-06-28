import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function ImageSwitch({ image, title }) {
  if (image) {
    if (image.extension && image.extension.toLowerCase() === "svg") {
      return (
        <img
          src={image.publicURL}
          alt={title}
          width="640"
          height="440"
          className="svg"
        />
      )
    } else {
      const sharp = getImage(image.childImageSharp)

      if (sharp) {
        return (
          <GatsbyImage image={sharp} alt={title} className="image-switch" />
        )
      }
    }
  }

  return null
}
