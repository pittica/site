import React from "react"
import Layout from "./layout"
import Hero from "../ui/hero"
import Rain from "../ui/gfx/rain"

export default function ErrorLayout({ location, title, code, image }) {
  return (
    <Layout location={location} title={title}>
      <Rain>
        <Hero title={code} subtitle={title} />
        <figure className="image">
          <img src={image} alt={code} width="1000" height="700" />
        </figure>
      </Rain>
    </Layout>
  )
}
