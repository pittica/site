import React, { Component } from 'react';
import { graphql } from 'gatsby';

import StaticLayout from '../components/layout/static-layout';

export default class ServicesListTemplate extends Component {
  render() {
    return (
      <StaticLayout
        context={this.props.pageContext}
        location={this.props.location}
        nodes={this.props.data.allGraphCmsService.nodes}
        title="Servizi"
        description="I nostri servizi"
      />
    );
  }
}

export const pageQuery = graphql`
  query ServicesListTemplate($skip: Int!, $limit: Int!) {
    allGraphCmsService(filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }, limit: $limit, skip: $skip) {
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
    }
  }
`;
