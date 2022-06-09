import React, { Fragment } from "react"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"
import { Gropiusstadt } from "@pittica/art"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Hero from "../components/ui/hero"
import Rain from "../components/ui/gfx/rain"

export default function NotFoundPage({ location }) {
  const { t } = useTranslation()

  return (
    <Fragment>
      <Seo
        title={t("Not Found")}
        description={t("404 Error")}
        path={location.pathname}
      />
      <Rain>
        <Hero title="404" subtitle={t("Not Found")} />
        <Gropiusstadt />
      </Rain>
    </Fragment>
  )
}

export const pageQuery = graphql`
  query NotFoundPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
