import React from "react"
import { Link } from "gatsby"

import ImageSwitch from "./image-switch"

export default function ImagePost({ image, title, link }) {
  if (image && image.localFile) {
    if (link) {
      return (
        <Link to={link}>
          <ImageSwitch title={title} image={image.localFile} />
        </Link>
      )
    } else {
      return <ImageSwitch title={title} image={image.localFile} />
    }
  } else {
    return null
  }
}
