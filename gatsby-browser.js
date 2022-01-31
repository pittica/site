import React from "react"

import Footer from "./src/components/ui/footer"
import TopMenu from "./src/components/nav/top-menu"

import "./src/scss/style.scss"

export function wrapPageElement({ element, props }) {
  return (
    <div>
      <TopMenu location={props.location} />
      {element}
      <Footer />
    </div>
  )
}

export function onServiceWorkerUpdateReady() {
  window.location.reload()
}
