import React from 'react';
import { graphql } from 'gatsby';

import CategoryLayout from '../components/layout/category-layout';

const TagTemplate = ({ location, pageContext, data: { tag, posts } }) => (
  <CategoryLayout context={pageContext} nodes={posts.edges} label={`Tag "${tag.name}"`} location={location} />
);

export const pageQuery = graphql`
  query TagTemplate($id: String, $slug: String, $limit: Int!, $skip: Int!) {
    tag: graphCmsTag(slug: { eq: $slug }, locale: { eq: it }, stage: { eq: PUBLISHED }) {
      name
    }
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      sort: { fields: date, order: DESC }
      filter: { stage: { eq: PUBLISHED }, locale: { eq: it }, tags: { elemMatch: { id: { eq: $id } } } }
    ) {
      edges {
        node {
          id
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 640, height: 440, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
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

export default TagTemplate;
