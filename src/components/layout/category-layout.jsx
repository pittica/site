import React from "react"
import classNames from "classnames"

import ArticleGrid from "../ui/article/article-grid"
import Hero from "../ui/hero"
import Layout from "./layout"
import ListNav from "../nav/list-nav"
import Section from "../ui/section"

export default function CategoryLayout({
  context,
  nodes,
  label,
  location,
  description,
}) {
  const { name } = context

  if (nodes.length > 0) {
    return (
      <Layout location={location} title={label} description={description}>
        <Section title={label} subtitle={description || name}>
          <div className={classNames("columns", "is-multiline")}>
            {nodes.map((node) => {
              return (
                <div
                  className={classNames("column", "is-one-third")}
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
      <Layout
        location={location}
        title={description ? label : `${label} "${name}"`}
      >
        <Hero title={label} subtitle={description || name} />
        <Section>Nessun Post Trovato</Section>
      </Layout>
    )
  }
}
