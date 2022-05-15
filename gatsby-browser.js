import React from "react"

import Footer from "./src/components/ui/footer"
import TopMenu from "./src/components/nav/top-menu"

import "./src/scss/style.scss"

export function wrapPageElement({ element, props: { location } }) {
  return (
    <div>
      <TopMenu location={location} />
      {element}
      <Footer />
    </div>
  )
}

export function onServiceWorkerUpdateReady() {
  window.location.reload(true)
}
