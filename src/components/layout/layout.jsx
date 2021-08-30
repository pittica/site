import React from "react"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Footer from "../ui/footer"
import Main from "../ui/main"
import TopMenu from "../nav/top-menu"

export default function Layout({ children, location, title, description }) {
  return (
    <div>
      <Seo title={title} description={description} path={location.pathname} />
      <TopMenu location={location} />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
