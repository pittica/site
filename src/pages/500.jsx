import React from "react"

import ErrorLayout from "../components/layout/error-layout"

import image from "../../static/assets/404.svg"

export default function InternalErrorPage({ location }) {
  return (
    <ErrorLayout
      code="500"
      image={image}
      title="Internal Error"
      location={location}
    />
  )
}
