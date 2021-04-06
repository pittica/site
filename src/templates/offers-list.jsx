import React, { Component } from 'react';
import { graphql } from 'gatsby';

import StaticLayout from '../components/layout/static-layout';

export default class OffersListTemplate extends Component {
  render() {
    return (
      <StaticLayout
        context={this.props.pageContext}
        location={this.props.location}
        nodes={this.props.data.allGraphCmsOffer.nodes}
        title="Offerte"
        description="Le nostre proposte"
      />
    );
  }
}

export const pageQuery = graphql`
  query OffersListTemplate($skip: Int!, $limit: Int!) {
    allGraphCmsOffer(filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }, limit: $limit, skip: $skip) {
      nodes {
        id
        title
        slug
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
