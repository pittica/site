import React, { Fragment } from "react"

import Footer from "./src/components/ui/footer"
import Main from "./src/components/ui/main"
import TopMenu from "./src/components/nav/top-menu"

import "./src/scss/style.scss"

export function wrapPageElement({ element, props: { location } }) {
  return (
    <Fragment>
      <TopMenu location={location} />
      <Main>{element}</Main>
      <Footer />
    </Fragment>
  )
}

export function onServiceWorkerUpdateReady() {
  window.location.reload(true)
}
