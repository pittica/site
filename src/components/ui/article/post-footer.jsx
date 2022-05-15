import React from "react"
import classNames from "classnames"

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
              {image.credits.html && (
                <div
                  className={classNames("content", "rich")}
                  dangerouslySetInnerHTML={{ __html: image.credits.html }}
                />
              )}
            </div>
          )}
        </div>
      </Section>
    )
  } else {
    return null
  }
}
