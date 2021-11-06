import React from "react"
import classNames from "classnames"
import { MarkdownRenderer } from "@pittica/gatsby-plugin-mdx-shortcodes"

import People from "../../sections/people"
import Section from "../section"

export default function PostFooter({ post: { people, image } }) {
  if (people.length > 0 || image.credits) {
    return (
      <Section>
        <h3 className="title">Credits</h3>
        <div className="columns">
          <People nodes={people} />
          {image.credits && (
            <div className={classNames("column", "has-text-right")}>
              <h4 className="title">Cover</h4>
              <MarkdownRenderer>{image.credits}</MarkdownRenderer>
            </div>
          )}
        </div>
      </Section>
    )
  } else {
    return null
  }
}
