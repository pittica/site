import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classNames from "classnames"

import ImageSwitch from "../ui/image/image-switch"

import "../../scss/sections/_parterships.scss"

function PartnershipsImage({ name, logo, logoUrl, width, height }) {
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
        width={width ? width : logo.data.width ? logo.data.width : null}
        height={height ? height : logo.data.height ? logo.data.height : null}
      />
    )
  } else {
    return <strong>{name}</strong>
  }
}

function PartnershipsLink({ name, page, link, logo, logoUrl, width, height }) {
  if (link || page) {
    if (link) {
      return (
        <a href={link} target="_new" title={name}>
          <PartnershipsImage
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
          <PartnershipsImage
            image={logo}
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
      <PartnershipsImage
        image={logo}
        logoUrl={logoUrl}
        name={name}
        width={width}
        height={height}
      />
    )
  }
}

export default function Partnerships({ nodes, list }) {
  if (nodes && nodes.length > 0) {
    return (
      <div
        className={classNames(
          "columns",
          "is-vcentered",
          "is-multiline",
          "parterships"
        )}
      >
        {nodes.map(
          ({ id, name, page, link, logo, logoUrl, width, height }, i) => {
            if (logo || logoUrl) {
              return (
                <div
                  key={`partnerships-${i}-${id}`}
                  className={classNames("column", "is-4", "has-text-centered")}
                >
                  <PartnershipsLink
                    name={name}
                    page={page}
                    link={link}
                    logo={list ? null : logo}
                    logoUrl={list ? null : logoUrl}
                    width={width}
                    height={height}
                  />
                </div>
              )
            } else {
              return null
            }
          }
        )}
      </div>
    )
  } else {
    return null
  }
}

Partnerships.propTypes = {
  nodes: PropTypes.array.isRequired,
  list: PropTypes.bool,
}

Partnerships.defaultProps = {
  nodes: [],
  list: false,
}
