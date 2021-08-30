import React from "react"
import classNames from "classnames"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Section from "../ui/section"

export default function Screenshots({ screenshots, title }) {
  if (screenshots && screenshots.length > 0) {
    return (
      <Section title="Screenshot" className="screenshots">
        <div className="columns">
          {screenshots.map((screenshot, i) => {
            const image = getImage(screenshot.localFile.childImageSharp)

            if (image) {
              return (
                <div className={classNames("column", "is-6")} key={i}>
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
