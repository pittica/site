import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { categorify, groupify } from "@pittica/gatsby-plugin-utils"

import Icon from "../components/ui/icon"
import Layout from "./layout"

export default function List({ nodes, groups, location, title, icon, group }) {
  const entries = categorify(nodes)

  return (
    <Layout location={location} title={title} header={true}>
      <div className="container">
        {groups.map(({ fieldValue, totalCount }, i) => {
          const { slug, name } = entries[fieldValue]

          return (
            <Icon
              key={`${group}-${i}`}
              glyph={`icon-pittica-${icon}`}
              className="has-text-primary"
            >
              <Link to={groupify(slug, group)} title={name}>
                {name} ({totalCount})
              </Link>
            </Icon>
          )
        })}
      </div>
    </Layout>
  )
}

List.propTypes = {
  nodes: PropTypes.array,
  groups: PropTypes.array,
  location: PropTypes.object,
  title: PropTypes.string,
  icon: PropTypes.string,
  group: PropTypes.string,
}

List.defaultProps = {
  nodes: [],
  groups: [],
  icon: "folder",
}
