import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import PartnershipLink from "../ui/link/partnership-link"

import "../../scss/sections/_parterships.scss"

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
                  className={classNames("column", "is-3", "has-text-centered")}
                >
                  <PartnershipLink
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
