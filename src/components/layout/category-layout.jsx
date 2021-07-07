import React from "react"
import classnames from "classnames"

import ListNav from "../nav/list-nav"
import Layout from "./layout"
import EmptyLayout from "./empty-layout"
import Section from "../ui/section"
import ArticleGrid from "../ui/article/article-grid"

export default function CategoryLayout({ context, nodes, label, location }) {
  const { name } = context

  if (nodes.length > 0) {
    return (
      <Layout location={location} title={label}>
        <Section title={label} subtitle={name}>
          <div className={classnames("columns", "is-multiline")}>
            {nodes.map((node) => {
              return (
                <div
                  className={classnames("column", "is-one-third")}
                  key={node.slug}
                >
                  <ArticleGrid node={node} />
                </div>
              )
            })}
          </div>
        </Section>
        <ListNav context={context} />
      </Layout>
    )
  } else {
    return (
      <EmptyLayout location={location} title={label} value={name}>
        Nessun Post Trovato
      </EmptyLayout>
    )
  }
}
