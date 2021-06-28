import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

import Sign from "../ui/sign"

import "../../scss/nav/_navbar-logo.scss"

export default function NavbarLogo({ title }) {
  const {
    site: {
      siteMetadata: {
        appearance: { background },
      },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          appearance {
            background
          }
        }
      }
    }
  `)

  return (
    <Link to="/" className="navbar-logo">
      <Sign color={background} alt={title} width="316" height="69" />
    </Link>
  )
}
