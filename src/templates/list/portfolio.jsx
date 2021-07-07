import React from "react"
import { graphql } from "gatsby"
import classnames from "classnames"
import { groupify } from "@pittica/gatsby-plugin-utils"

import ListLayout from "../../components/layout/list-layout"
import Card from "../../components/ui/card"

export default function Portfolio({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <ListLayout
      location={location}
      context={pageContext}
      title="Portfolio"
      description="I nostri lavori"
    >
      <div className={classnames("columns", "is-multiline", "is-mobile")}>
        {nodes.map(({ title, slug, image }) => {
          const link = groupify(slug, pageContext.group)

          return (
            <div
              className={classnames(
                "column",
                "is-half-mobile",
                "is-one-third-tablet",
                "is-one-quarter-desktop"
              )}
              key={slug}
            >
              <article className="p-6">
                <Card image={image} title={title} link={link} />
              </article>
            </div>
          )
        })}
      </div>
    </ListLayout>
  )
}

export const pageQuery = graphql`
  query PortfolioListTemplate(
    $skip: Int!
    $limit: Int!
    $locale: GraphCMS_Locale!
  ) {
    posts: allGraphCmsPortfolio(
      filter: { stage: { eq: PUBLISHED }, locale: { eq: $locale } }
      limit: $limit
      skip: $skip
      sort: { fields: updatedAt, order: DESC }
    ) {
      nodes {
        slug
        locale
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 640
                height: 440
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
            extension
            publicURL
          }
        }
      }
      totalCount
    }
  }
`
