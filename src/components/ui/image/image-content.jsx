import React from "react"

import Image from "./image"

export default function ImageContent({ image, title, size, className }) {
  if (image && image.localFile) {
    return (
      <Image
        src={image.localFile.publicURL}
        title={title}
        size={size}
        className={className}
      />
    )
  } else {
    return title
  }
}
