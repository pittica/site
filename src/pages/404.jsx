import React from "react"
import { Gropiusstadt } from "@pittica/art"

import Hero from "../components/ui/hero"
import Layout from "../layouts/layout"
import Rain from "../components/ui/gfx/rain"

export default function NotFoundPage({ location }) {
  return (
    <Layout location={location} title="Not Found" description="Errore 404">
      <Rain>
        <Hero title="404" subtitle="Not Found" />
        <Gropiusstadt />
      </Rain>
    </Layout>
  )
}
