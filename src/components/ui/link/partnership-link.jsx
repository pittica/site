import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import ImagePartnership from "../image/image-partnership"

export default function PartnershipLink({
  name,
  page,
  link,
  logo,
  logoUrl,
  width,
  height,
}) {
  if (link || page) {
    if (link) {
      return (
        <a href={link} target="_new" title={name}>
          <ImagePartnership
            logo={logo}
            logoUrl={logoUrl}
            name={name}
            width={width}
            height={height}
          />
        </a>
      )
    } else {
      return (
        <Link to={`/${page.slug}`} target="_new" title={name}>
          <ImagePartnership
            logo={logo}
            logoUrl={logoUrl}
            name={name}
            width={width}
            height={height}
          />
        </Link>
      )
    }
  } else {
    return (
      <ImagePartnership
        logo={logo}
        logoUrl={logoUrl}
        name={name}
        width={width}
        height={height}
      />
    )
  }
}

PartnershipLink.propTypes = {
  name: PropTypes.string,
  page: PropTypes.object,
  link: PropTypes.string,
  logo: PropTypes.object,
  logoUrl: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}
