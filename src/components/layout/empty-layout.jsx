import React from "react"
import Layout from "./layout"
import Section from "../ui/section"
import Hero from "../ui/hero"

export default function EmptyLayout({ location, title, value }) {
  return (
    <Layout location={location} title={`${title} "${value}"`}>
      <Hero title={title} subtitle={value} />
      <Section>Nessun Post Trovato</Section>
    </Layout>
  )
}
