import React from "react"

import ImageContent from "./image-content"

export default function ImageLink({ link, title, image, size, className }) {
  if (link) {
    return (
      <a href={link} title={title} target="_system">
        <ImageContent
          image={image}
          title={title}
          size={size}
          className={className}
        />
      </a>
    )
  } else {
    return (
      <ImageContent
        image={image}
        title={title}
        size={size}
        className={className}
      />
    )
  }
}
