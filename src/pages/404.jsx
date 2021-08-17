import React from "react"

import Layout from "../components/layout/layout"
import Hero from "../components/ui/hero"
import Rain from "../components/ui/gfx/rain"

import image from "../images/404.svg"

export default function NotFoundPage({ location }) {
  return (
    <Layout location={location} title="Not Found">
      <Rain>
        <Hero title="404" subtitle="Not Found" />
        <figure className="image">
          <img src={image} alt="404" width="1000" height="700" />
        </figure>
      </Rain>
    </Layout>
  )
}
