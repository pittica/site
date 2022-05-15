import React from "react"
import PropTypes from "prop-types"

import ImageSwitch from "./image-switch"

export default function ImagePartnership({
  name,
  logo,
  logoUrl,
  width,
  height,
}) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        width={width ? width : null}
        height={height ? height : null}
      />
    )
  } else if (logo && logo.localFile) {
    return (
      <ImageSwitch
        image={logo.localFile}
        title={name}
        width={
          width ? width : logo.data && logo.data.width ? logo.data.width : null
        }
        height={
          height
            ? height
            : logo.data && logo.data.height
            ? logo.data.height
            : null
        }
      />
    )
  } else {
    return <strong>{name}</strong>
  }
}

ImagePartnership.propTypes = {
  name: PropTypes.string,
  logo: PropTypes.object,
  logoUrl: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}
