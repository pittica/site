import React from "react"

import ErrorLayout from "../components/layout/error-layout"

import image from "../../static/assets/404.svg"

export default function UnauthorizedPage({ location }) {
  return (
    <ErrorLayout
      code="401"
      image={image}
      title="Unauthorized"
      location={location}
    />
  )
}
