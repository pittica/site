import React from 'react';
import { graphql } from 'gatsby';

import CategoryLayout from '../components/layout/category-layout';

const CategoryTemplate = ({ location, pageContext, data }) => (
  <CategoryLayout context={pageContext} nodes={data.allMarkdownRemark.edges} label="Categoria" location={location} />
);

export const pageQuery = graphql`
  query CategoryTemplate($name: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { categories: { in: [$name] } } }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
      }
      totalCount
      edges {
        node {
          fields {
            slug
            categories
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date(formatString: "DD/MM/YYYY")
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

export default CategoryTemplate;
