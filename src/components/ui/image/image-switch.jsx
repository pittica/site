import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function ImageSwitch({ image, title, width, height }) {
  if (image) {
    if (image.extension && image.extension.toLowerCase() === "svg") {
      return (
        <img
          src={image.publicURL}
          alt={title}
          width={width ? width : null}
          height={height ? height : null}
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

ImageSwitch.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

ImageSwitch.defaultProps = {
  width: 640,
  height: 440,
}
