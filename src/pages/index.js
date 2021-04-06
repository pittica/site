import React, { Component } from 'react';
import { graphql } from 'gatsby';

import About from '../components/sections/about';
import Blog from '../components/sections/blog';
import Partners from '../components/sections/partners';
import Layout from '../components/layout/layout';
import Section from '../components/ui/section';

export default class Index extends Component {
  render() {
    const { data: { allGraphCmsPost: { edges } }, location } = this.props;

    return (
      <Layout location={location}>
        <About />
        <Blog posts={edges} />
        <Section>
          <Partners />
        </Section>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    allGraphCmsPost(
      limit: 3
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
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
  }
`;
