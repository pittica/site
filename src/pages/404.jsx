import React from "react"

import ErrorLayout from "../components/layout/error-layout"

import image from "../../static/assets/404.svg"

export default function NotFoundPage({ location }) {
  return (
    <ErrorLayout
      code="404"
      image={image}
      title="Not Found"
      location={location}
    />
  )
}
