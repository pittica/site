import React, { useState } from "react"
import { Link } from "gatsby"
import classnames from "classnames"

import NavbarLogo from "./navbar-logo"
import NavbarItem from "./navbar-item"

import "../../scss/nav/_navbar.scss"

export default function Navbar({ location }) {
  const [burger, setBurger] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setBurger(!burger)

    return false
  }

  return (
    <nav
      className={classnames("navbar", "is-fixed-top")}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavbarLogo />
        <Link
          to="/"
          onClick={handleClick}
          role="button"
          className={classnames("navbar-burger", "burger", {
            "is-active": burger,
          })}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </Link>
      </div>
      <div
        className={classnames("navbar-menu", {
          "is-active": burger,
        })}
      >
        <div className="navbar-start">
          <NavbarItem to="/contact" location={location}>
            Contatti
          </NavbarItem>
          <NavbarItem to="/blog" location={location}>
            Blog
          </NavbarItem>
          <NavbarItem to="/about" location={location}>
            About
          </NavbarItem>
          <NavbarItem to="/portfolio" location={location}>
            Portfolio
          </NavbarItem>
          <NavbarItem to="/offers" location={location}>
            Offerte
          </NavbarItem>
        </div>
      </div>
    </nav>
  )
}
