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
        {nodes.map(({ title, slug, image, description }) => {
          const link = groupify(slug, pageContext.group)

          return (
            <div
              className={classnames(
                "column",
                "is-half-mobile",
                "is-one-third-tablet",
                "is-one-fifth-desktop"
              )}
              key={slug}
            >
              <article>
                <Card image={image} title={title} link={link}>
                  <h4 className="title">{title}</h4>
                  <p>{description}</p>
                </Card>
              </article>
            </div>
          )
        })}
      </div>
    </ListLayout>
  )
}

export const pageQuery = graphql`
  query PortfolioListTemplate($skip: Int!, $limit: Int!) {
    posts: allGraphCmsPortfolio(
      filter: { stage: { eq: PUBLISHED }, locale: { eq: it } }
      limit: $limit
      skip: $skip
      sort: { fields: updatedAt, order: DESC }
    ) {
      nodes {
        slug
        title
        description
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
