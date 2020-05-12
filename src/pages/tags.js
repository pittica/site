import React from "react"
import { Link, graphql } from "gatsby"
import { pathify } from "gatsby-plugin-tags/internals"
import slugify from "slug"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import Section from "../components/ui/section"

class TagsPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Section title="Tag">
          <ul className="page-list">
            {data.allMarkdownRemark.group.map((node, index) => {
              return (
                <li key={"tag-" + index}>
                  <Link to={pathify('tags', slugify(node.fieldValue, { lower: true }))}>
                    <i className="icon-pittica-tag"></i> {node.fieldValue} ({node.totalCount})
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

export default TagsPage

TagsPage.propTypes = {
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
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
