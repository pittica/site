import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classNames from "classnames"

import ArticleGrid from "../components/ui/article/article-grid"
import Section from "../components/ui/section"
import ListNav from "../components/nav/list-nav"
import Layout from "./layout"

export default function Grid({
  context,
  nodes,
  label,
  location,
  description,
  nav,
}) {
  const { name } = context

  if (nodes.length > 0) {
    return (
      <Layout
        location={location}
        title={label}
        description={description || name}
        header={true}
      >
        <Section>
          <div className={classNames("columns", "is-multiline")}>
            {nodes.map((node) => (
              <div
                className={classNames("column", "is-one-third")}
                key={node.slug}
              >
                <ArticleGrid node={node} />
              </div>
            ))}
          </div>
        </Section>
        {nav && <ListNav context={context} />}
      </Layout>
    )
  } else {
    return (
      <Layout
        location={location}
        title={description ? label : `${label} "${name}"`}
        description="Nessun Articolo Trovato"
        header={true}
      >
        <div className={classNames("has-text-centered", "mb-6")}>
          <Link to="/">Vai alla Home</Link>
        </div>
      </Layout>
    )
  }
}

Grid.propTypes = {
  context: PropTypes.object,
  nodes: PropTypes.array,
  label: PropTypes.string,
  location: PropTypes.object,
  description: PropTypes.string,
  nav: PropTypes.bool,
}

Grid.defaultProps = {
  nodes: [],
  nav: false,
}
