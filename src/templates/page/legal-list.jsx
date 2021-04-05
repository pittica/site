import React, { Component } from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';

import ListLayout from '../../components/layout/list-layout';
import PageGrid from '../../components/ui/article/page-grid';

export default class LegalListTemplate extends Component {
  render() {
    const { data, pageContext } = this.props;

    return (
      <ListLayout location={this.props.location} context={pageContext}>
        <div className={classnames('columns', 'is-multiline')}>
          {data.allMarkdownRemark.edges.map(({ node }) => {
            return (
              <div className={classnames('column', 'is-half')} key={node.fields.slug}>
                <PageGrid node={node} />
              </div>
            );
          })}
        </div>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query LegalListTemplate($skip: Int!, $limit: Int!, $regex: String!) {
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
            date(formatString: "DD/MM/YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
