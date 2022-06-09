import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Image from "../ui/image/image"
import InnerLink from "../ui/link/inner-link"

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
        {nodes.map(({ id, name, link, logo }, i) => {
          if (logo) {
            return (
              <div
                key={`partnerships-${i}-${id}`}
                className={classNames("column", "is-3", "has-text-centered")}
              >
                <InnerLink link={link} title={name}>
                  {list ? (
                    name
                  ) : (
                    <Image
                      src={logo.url || logo.asset?.localFile?.publicURL}
                      title={name}
                      width={
                        logo.asset?.width
                          ? logo.asset?.width
                          : logo.asset?.data && logo.asset?.data.width
                          ? logo.asset?.data.width
                          : null
                      }
                      height={
                        logo.asset?.height
                          ? logo.asset?.height
                          : logo.asset?.data && logo.asset?.data.height
                          ? logo.asset?.data.height
                          : null
                      }
                    />
                  )}
                </InnerLink>
              </div>
            )
          } else {
            return null
          }
        })}
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
