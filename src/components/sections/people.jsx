import React from "react"
import classNames from "classnames"
import { commalify } from "@pittica/gatsby-plugin-utils"

import Card from "../ui/card"

export default function People({ nodes }) {
  if (nodes.length > 0) {
    return (
      <div className={classNames("columns", "is-multiline", "mb-6")}>
        {nodes.map((person, index) => (
          <div
            className={classNames("column", "has-text-centered")}
            key={"person-" + index}
          >
            <Card image={person.image} title={person.name}>
              <h5 className="subtitle">{person.name}</h5>
              {person.roles.length > 0 && (
                <div>
                  <strong>{commalify(person.roles)}</strong>
                </div>
              )}
              {(person.linkedIn || person.email) && (
                <div className="mt-2">
                  {person.linkedIn && (
                    <a href={person.linkedIn} title="LinkedIn" target="_new">
                      <i
                        className={classNames("icon-pittica-linkedin", "p-2")}
                      />
                    </a>
                  )}
                  {person.email && (
                    <a href={`mailto:${person.email}`} title={person.email}>
                      <i
                        className={classNames("icon-pittica-envelope", "p-2")}
                      />
                    </a>
                  )}
                </div>
              )}
              {person.bio && (
                <div>
                  {person.bio.split("\n").map((line, i) => {
                    return <p key={`bio-${person}-${index}-${i}`}>{line}</p>
                  })}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}
