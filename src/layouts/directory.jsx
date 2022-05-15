import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Section from "../components/ui/section"
import StaticGrid from "../components/ui/article/static-grid"
import ListNav from "../components/nav/list-nav"
import Layout from "./layout"

export default function Directory({
  nodes,
  location,
  context,
  title,
  description,
}) {
  return (
    <Layout
      location={location}
      context={context}
      title={title}
      description={description}
      header={true}
    >
      <Section>
        <div className={classNames("columns", "is-multiline")}>
          {nodes.map((node, i) => {
            return (
              <div
                className={classNames("column", "is-one-third")}
                key={`${context.group}-${i}-${node.id}`}
              >
                <StaticGrid node={node} group={context.group} />
              </div>
            )
          })}
        </div>
      </Section>
      <ListNav context={context} />
    </Layout>
  )
}

Directory.propTypes = {
  nodes: PropTypes.array.isRequired,
  location: PropTypes.object,
  context: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
}

Directory.defaultProps = {
  nodes: [],
}
