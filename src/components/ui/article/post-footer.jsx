import React from "react"
import classNames from "classnames"
import { commalify } from "@pittica/gatsby-plugin-utils"

import ImagePost from "../image/image-post"
import Renderer from "../../../mdx/renderer"
import Section from "../section"

export default function PostFooter({ post: { people, image } }) {
  if (people.length > 0 || image.credits) {
    return (
      <Section>
        <h3 className="title">Credits</h3>
        <div className="columns">
          {people.length > 0 && (
            <div className="column">
              {people.map((person, index) => (
                <div className="columns" key={"person" + index}>
                  <div className={classNames("column", "is-3")}>
                    <figure className={classNames("image", "is-square")}>
                      <ImagePost image={person.image} title={person.name} />
                    </figure>
                  </div>
                  <div className={classNames("column", "is-9")}>
                    <h5 className="subtitle">{person.name}</h5>
                    {person.roles.length > 0 && (
                      <span>{commalify(person.roles)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {image.credits && (
            <div className={classNames("column", "has-text-right")}>
              <h3 className="title">Cover</h3>
              <Renderer>{image.credits}</Renderer>
            </div>
          )}
        </div>
      </Section>
    )
  } else {
    return null
  }
}
