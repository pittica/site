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
      startItems={[
        { to: "/about", label: "Chi Siamo" },
        { to: "/portfolio", label: "Portfolio" },
        { to: "/offers", label: "Offerte" },
        { to: "/blog", label: "Blog" },
        { to: "/contact", label: "Contatti" },
        { link: "https://support.pittica.com", label: "Supporto" },
      ]}
    >
      <Sign color={background} alt={title} width="316" height="69" />
    </Navbar>
  )
}
