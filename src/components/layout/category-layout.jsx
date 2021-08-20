import React from "react"
import classnames from "classnames"

import ArticleGrid from "../ui/article/article-grid"
import Hero from "../ui/hero"
import Layout from "./layout"
import ListNav from "../nav/list-nav"
import Section from "../ui/section"

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
      <Layout location={location} title={`${label} "${name}"`}>
        <Hero title={label} subtitle={name} />
        <Section>Nessun Post Trovato</Section>
      </Layout>
    )
  }
}
