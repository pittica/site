import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Section from "../ui/section"

export default function Screenshots({ screenshots, title }) {
  if (screenshots && screenshots.length > 0) {
    return (
      <Section title="Screenshot" className="screenshots">
        <div className="columns">
          {screenshots.map(({ localFile }, i) => {
            const image = localFile ? getImage(localFile.childImageSharp) : null

            if (image) {
              return (
                <div
                  className={classNames("column", "is-6")}
                  key={`screenshots-${i}`}
                >
                  <GatsbyImage image={image} alt={title} />
                </div>
              )
            } else {
              return null
            }
          })}
        </div>
      </Section>
    )
  } else {
    return null
  }
}

Screenshots.propTypes = {
  screenshots: PropTypes.array,
  title: PropTypes.string,
}

Screenshots.defaultProps = {
  screenshots: [],
}
