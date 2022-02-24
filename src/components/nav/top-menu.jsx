import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Navbar } from "@pittica/gatsby-plugin-navigation"
import { Logo } from "@pittica/art"

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
    query TopMenu {
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
        { to: "/blog", label: "Blog" },
        { to: "/portfolio", label: "Portfolio" },
        { to: "/contact", label: "Contatti" },
        { link: "https://support.pittica.com", label: "Supporto" },
      ]}
    >
      <Link to="/" className="navbar-logo" title={title}>
        <Logo color={background} width={316} height={69} />
      </Link>
    </Navbar>
  )
}

TopMenu.propTypes = {
  location: PropTypes.object,
}
