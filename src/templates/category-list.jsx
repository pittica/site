import React from 'react';
import { graphql } from 'gatsby';

import CategoryLayout from '../components/layout/category-layout';

const CategoryTemplate = ({ location, pageContext, data: { category, posts } }) => (
  <CategoryLayout
    context={pageContext}
    nodes={posts.edges}
    label={`Categoria "${category.name}"`}
    location={location}
  />
);

export const pageQuery = graphql`
  query CategoryTemplate($id: String, $slug: String, $limit: Int!, $skip: Int!) {
    category: graphCmsCategory(slug: { eq: $slug }, locale: { eq: it }, stage: { eq: PUBLISHED }) {
      name
    }
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      sort: { fields: date, order: DESC }
      filter: { stage: { eq: PUBLISHED }, locale: { eq: it }, categories: { elemMatch: { id: { eq: $id } } } }
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

export default CategoryTemplate;
