import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { commalify } from "@pittica/gatsby-plugin-utils"

import Card from "../ui/card"

export default function People({ nodes, list }) {
  if (nodes.length > 0) {
    if (list) {
      return (
        <ul>
          {nodes.map(({ id, firstName, lastName, email, linkedIn }, i) => (
            <li key={`people-${i}-${id}`}>
              {firstName} {lastName}
              {linkedIn && (
                <a href={linkedIn} title="LinkedIn" target="_new">
                  <i className={classNames("icon-pittica-linkedin", "p-2")} />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} title={email}>
                  <i className={classNames("icon-pittica-envelope", "p-2")} />
                </a>
              )}
            </li>
          ))}
        </ul>
      )
    } else {
      return (
        <div className={classNames("columns", "is-multiline", "mb-6")}>
          {nodes.map(
            (
              { id, firstName, lastName, image, roles, email, linkedIn, bio },
              i
            ) => (
              <div className="column" key={`people-${i}-${id}`}>
                <Card image={image} title={`${firstName} ${lastName}`}>
                  <h5 className="subtitle">
                    {firstName} {lastName}
                  </h5>
                  {roles.length > 0 && (
                    <div>
                      <strong>{commalify(roles)}</strong>
                    </div>
                  )}
                  {(linkedIn || email) && (
                    <div className="mt-2">
                      {linkedIn && (
                        <a href={linkedIn} title="LinkedIn" target="_new">
                          <i
                            className={classNames(
                              "icon-pittica-linkedin",
                              "p-2"
                            )}
                          />
                        </a>
                      )}
                      {email && (
                        <a href={`mailto:${email}`} title={email}>
                          <i
                            className={classNames(
                              "icon-pittica-envelope",
                              "p-2"
                            )}
                          />
                        </a>
                      )}
                    </div>
                  )}
                  {bio && (
                    <div>
                      {bio.split("\n").map((line, i) => {
                        return <p key={`${id}-bio-${i}`}>{line}</p>
                      })}
                    </div>
                  )}
                </Card>
              </div>
            )
          )}
        </div>
      )
    }
  } else {
    return null
  }
}

People.propTypes = {
  nodes: PropTypes.array.isRequired,
  list: PropTypes.bool,
}

People.defaultProps = {
  nodes: [],
  list: false,
}
