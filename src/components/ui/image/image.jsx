import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

export default function Image({ src, title, size, className, width, height }) {
  let classSize = null

  switch (size) {
    case 16:
      classSize = "is-16x16"
      break
    case 24:
      classSize = "is-24x24"
      break
    case 32:
      classSize = "is-32x32"
      break
    case 48:
      classSize = "is-48x48"
      break
    case 64:
      classSize = "is-64x64"
      break
    case 96:
      classSize = "is-96x96"
      break
    case 128:
      classSize = "is-128x128"
      break
    default:
      classSize = "is-fullwidth"
      break
  }

  return (
    <img
      src={src}
      alt={title}
      title={title}
      className={classNames("image", classSize, className)}
      width={width}
      height={height}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}
