import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { commalify } from "@pittica/gatsby-plugin-utils"

import Card from "../ui/card"
import SocialLinks from "../ui/social-links"

export default function People({ nodes, list }) {
  if (nodes.length > 0) {
    if (list) {
      return (
        <ul>
          {nodes.map(
            (
              { id, firstName, lastName, email, linkedIn, gitHub, imdb, phone },
              i
            ) => (
              <li key={`people-${i}-${id}`}>
                {firstName} {lastName}
                <SocialLinks
                  email={email}
                  linkedIn={linkedIn}
                  gitHub={gitHub}
                  imdb={imdb}
                  phone={phone}
                />
              </li>
            )
          )}
        </ul>
      )
    } else {
      return (
        <div className={classNames("columns", "is-multiline", "mb-6")}>
          {nodes.map(
            (
              {
                id,
                firstName,
                lastName,
                image,
                roles,
                email,
                linkedIn,
                gitHub,
                imdb,
                phone,
                bio,
              },
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
                  <SocialLinks
                    email={email}
                    linkedIn={linkedIn}
                    gitHub={gitHub}
                    imdb={imdb}
                    phone={phone}
                  />
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
