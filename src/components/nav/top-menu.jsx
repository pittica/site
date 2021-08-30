import React from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import { Navbar } from "@pittica/gatsby-plugin-navigation"

import Sign from "../ui/sign"

import "../../scss/nav/_top-menu.scss"

export default function TopMenu({ location }) {
  const {
    site: {
      siteMetadata: {
        title,
        appearance: { background },
      },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          appearance {
            background
          }
        }
      }
    }
  `)

  return (
    <Navbar
      className={classNames("top-menu", "is-fixed-top")}
      location={location}
      items={[
        { to: "/contact", label: "Contatti" },
        { to: "/blog", label: "Blog" },
        { to: "/about", label: "About" },
        { to: "/portfolio", label: "Portfolio" },
        { to: "/offers", label: "Offerte" },
      ]}
    >
      <Sign color={background} alt={title} width="316" height="69" />
    </Navbar>
  )
}
