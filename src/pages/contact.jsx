import React, { useState } from "react"

import Layout from "../components/layout/layout"
import Airplane from "../components/ui/gfx/airplane"
import Hero from "../components/ui/hero"
import ContactForm from "../components/contact-form"

export default function Contact({ location }) {
  const [loading, setLoading] = useState(false)

  return (
    <Layout location={location} title="Contatti">
      <Hero title="Contatti" subtitle="Contatta Pittica" />
      <Airplane active={loading}>
        <ContactForm onLoading={({ active }) => setLoading(active)} />
      </Airplane>
    </Layout>
  )
}
