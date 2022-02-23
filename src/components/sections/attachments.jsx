import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Icon from "../ui/icon"

import "../../scss/sections/_attachments.scss"

export default function Attachments({ nodes }) {
  if (nodes && nodes.length > 0) {
    return (
      <div className={classNames("columns", "attachments")}>
        {nodes.map(
          ({ id, title, fileName, localFile, fileCategory }, i) => {
            if (localFile && localFile.publicURL) {
              const name = title || fileName

              return (
                <div
                  className={classNames("column", "is-one-third")}
                  key={`attachments-${i}-${id}`}
                >
                  <a href={localFile.publicURL} title={name}>
                    <p>
                      <Icon
                        glyph={`icon-pittica-file${
                          fileCategory ? `-${fileCategory}` : ""
                        }`}
                        className="has-text-primary"
                      />
                    </p>
                    <p>{name}</p>
                  </a>
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

Attachments.propTypes = {
  nodes: PropTypes.array,
  title: PropTypes.string,
}

Attachments.defaultProps = {
  nodes: [],
}
