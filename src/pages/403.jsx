import React from "react"

import ErrorLayout from "../components/layout/error-layout"

import image from "../../static/assets/404.svg"

export default function ForbiddenPage({ location }) {
  return (
    <ErrorLayout
      code="403"
      image={image}
      title="Forbidden"
      location={location}
    />
  )
}
