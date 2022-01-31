import React from "react"
import { Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"

import Icon from "../components/ui/icon"
import Layout from "../layouts/layout"

export default function List({
  pageContext: { group, title, icon, nodes },
  location,
}) {
  return (
    <Layout location={location} title={title} header={true}>
      <div className="container">
        {nodes.length > 0 && (
          <ul className="inline">
            {nodes.map(({ name, slug, count }, i) => {
              if (count > 0) {
                return (
                  <li key={`${group}-${i}`}>
                    <Icon
                      glyph={`icon-pittica-${icon}`}
                      className="has-text-primary"
                    >
                      <Link to={groupify(slug, group)} title={name}>
                        {name} ({count})
                      </Link>
                    </Icon>
                  </li>
                )
              } else {
                return null
              }
            })}
          </ul>
        )}
      </div>
    </Layout>
  )
}
