import React from "react"

import Section from "../ui/section"
import Layout from "./layout"
import ListNav from "../nav/list-nav"
import Header from "../ui/header"

export default function ListLayout({
  children,
  context,
  location,
  title,
  description,
}) {
  return (
    <Layout location={location} title={title} description={description}>
      <Header title={title} subtitle={description} />
      <Section>{children}</Section>
      <ListNav context={context} />
    </Layout>
  )
}
