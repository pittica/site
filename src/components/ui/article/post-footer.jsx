import React from "react"
import classNames from "classnames"
import { useTranslation } from "gatsby-plugin-react-i18next"

import People from "../../sections/people"
import Section from "../section"

export default function PostFooter({ people, image }) {
  const { t } = useTranslation()

  if (people.length > 0 || image.credits) {
    return (
      <Section>
        <h3 className="title">{t("Credits")}</h3>
        <div className="columns">
          <People nodes={people} />
          {image?.credits && (
            <div className={classNames("column", "has-text-right")}>
              <h4 className="title">{t("Cover")}</h4>
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
