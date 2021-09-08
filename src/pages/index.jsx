import React from "react"
import { graphql } from "gatsby"
import classNames from "classnames"

import ArticleGrid from "../components/ui/article/article-grid"
import FeatureLink from "../components/ui/link/feature-link"
import Layout from "../components/layout/layout"
import Partners from "../components/sections/partners"
import Section from "../components/ui/section"
import SectionContainer from "../components/ui/section-container"
import Underground from "../components/ui/gfx/underground"

export default function Index({
  data: {
    posts: { nodes },
  },
  location,
}) {
  return (
    <Layout location={location}>
      <SectionContainer left={false}>
        <Underground />
        <Section
          title="Pittica"
          subtitle="Il tuo partner per la trasformazione digitale"
        >
          <div className="container">
            <div className={classNames("columns", "is-multiline")}>
              <div
                className={classNames(
                  "column",
                  "is-two-thirds",
                  "is-offset-one-third"
                )}
              >
                <FeatureLink to="/about" label="Leggi" />
              </div>
            </div>
          </div>
        </Section>
      </SectionContainer>
      {nodes.length > 0 && (
        <Section
          title="Blog"
          subtitle="Approfondimenti dal mondo digitale"
          link="/blog"
        >
          <div className={classNames("columns", "is-multiline")}>
            {nodes.map((node) => {
              return (
                <div
                  className={classNames("column", "is-one-third")}
                  key={node.slug}
                >
                  <ArticleGrid node={node} />
                </div>
              )
            })}
          </div>
        </Section>
      )}
      <Partners />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    posts: allGraphCmsPost(
      limit: 3
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        id
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
          }
        }
        slug
        excerpt
        date: formattedDate
        title
      }
    }
  }
`
