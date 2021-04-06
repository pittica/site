import React, { Component } from 'react';
import { graphql } from 'gatsby';

import StaticLayout from '../components/layout/static-layout';

export default class PortfolioListTemplate extends Component {
  render() {
    return (
      <StaticLayout
        context={this.props.pageContext}
        location={this.props.location}
        nodes={this.props.data.allGraphCmsPortfolio.nodes}
        title="Portfolio"
        description="I nostri lavori"
      />
    );
  }
}

export const pageQuery = graphql`
  query PortfolioListTemplate($skip: Int!, $limit: Int!) {
    allGraphCmsPortfolio(filter: { stage: { eq: PUBLISHED }, locale: { eq: it } }, limit: $limit, skip: $skip) {
      nodes {
        slug
        title
        description
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 640, height: 440, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
      totalCount
    }
  }
`;
