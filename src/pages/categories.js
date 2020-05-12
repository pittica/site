import React from "react"
import { Link, graphql } from "gatsby"
import { pathify } from "gatsby-plugin-categories/internals"
import slugify from "slug"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import Section from "../components/ui/section"

class CategoriesPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Section title="Categorie">
          <ul className="page-list">
            {data.allMarkdownRemark.group.map((node, index) => {
              return (
                <li key={"category-" + index}>
                  <Link to={pathify('category', slugify(node.fieldValue, { lower: true }))}>
                    <i className="icon-pittica-folder"></i> {node.fieldValue} ({node.totalCount})
                  </Link>
                </li>
              )
            })}
          </ul>
        </Section>
      </Layout>
    )
  }
}

export default CategoriesPage

CategoriesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
