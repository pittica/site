import React from "react"
import classNames from "classnames"

import ImagePost from "./image/image-post"

import "../../scss/ui/_card.scss"

export default function Card({ children, image, title, link }) {
  return (
    <div className="card">
      {image && (
        <div
          className={classNames(
            "card-image",
            image.localFile && image.localFile.extension
              ? image.localFile.extension.toLowerCase()
              : null
          )}
        >
          <figure className={classNames("image", "is-square")}>
            <ImagePost image={image} title={title} link={link} />
          </figure>
        </div>
      )}
      {children && (
        <div className="card-content">
          <div className="content">{children}</div>
        </div>
      )}
    </div>
  )
}
