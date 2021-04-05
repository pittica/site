import React from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';

import Layout from '../components/layout/layout';
import Section from '../components/ui/section';
import ArticleGrid from '../components/ui/article/article-grid';
import ListNav from '../components/nav/list-nav';

export default class BlogList extends React.Component {
  render() {
    const { data, pageContext, location } = this.props;

    return (
      <Layout location={location} title="Blog">
        <Section title="Blog" subtitle="Pittica says">
          <div className={classnames('columns', 'is-multiline')}>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              return (
                <div className={classnames('column', 'is-one-third')} key={node.fields.slug}>
                  <ArticleGrid node={node} />
                </div>
              );
            })}
          </div>
        </Section>
        <ListNav context={pageContext} />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { slug: { regex: "^/blog/" } } }
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
