import React, { Component } from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';

import ListLayout from '../../components/layout/list-layout';
import StaticGrid from '../../components/ui/article/static-grid';

export default class PortfolioListTemplate extends Component {
  render() {
    const { data, pageContext } = this.props;

    return (
      <ListLayout location={this.props.location} context={pageContext}>
        <div className={classnames('columns', 'is-multiline')}>
          {data.allMarkdownRemark.edges.map(({ node }) => {
            return (
              <div className={classnames('column', 'is-one-third')} key={node.fields.slug}>
                <StaticGrid node={node} />
              </div>
            );
          })}
        </div>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query PortfolioListTemplate($skip: Int!, $limit: Int!, $regex: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { slug: { regex: $regex } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            image {
              childImageSharp {
                gatsbyImageData(width: 640, height: 440, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    }
  }
`;
