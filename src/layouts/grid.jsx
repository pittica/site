import React, { Fragment } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

import ArticleGrid from "../components/ui/article/article-grid"
import Section from "../components/ui/section"
import ListNav from "../components/nav/list-nav"
import Header from "../components/ui/header"
import Layout from "./layout"

export default function Grid({
  context,
  nodes,
  label,
  description,
  nav,
  location,
}) {
  const { t } = useTranslation()
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
                key={`grid-${node.id}`}
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
      <Fragment>
        <Header
          title={description ? label : `${label} "${name}"`}
          subtitle={t("No Articles Found")}
          sticky={true}
        />
        <div className={classNames("has-text-centered", "mb-6")}>
          <Link to="/">{t("Go to Home")}</Link>
        </div>
      </Fragment>
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
