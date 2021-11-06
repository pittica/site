import React from "react"
import classNames from "classnames"

import ArticleGrid from "../ui/article/article-grid"
import Header from "../ui/header"
import Hero from "../ui/hero"
import Section from "../ui/section"
import Layout from "../../layouts/layout"
import ListNav from "../nav/list-nav"

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
        <Header title={label} subtitle={description || name} />
        <Section>
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
