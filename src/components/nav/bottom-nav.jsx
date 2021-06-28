import React from "react"

import "../../scss/nav/_bottom-nav.scss"

export default function BottomNav({ children }) {
  if (children) {
    return <nav className="bottom-nav">{children}</nav>
  } else {
    return null
  }
}
