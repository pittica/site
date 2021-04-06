import React, { Component } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout/layout';
import Section from '../components/ui/section';
import CategoryLink from '../components/ui/link/category-link';

export default class CategoriesPage extends Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={siteTitle}>
        <Section title="Categorie">
          <ul className="page-list">
            {data.allMarkdownRemark.group.map((node, index) => {
              return (
                <li key={'category-' + index}>
                  <CategoryLink category={node.fieldValue} /> ({node.totalCount})
                </li>
              );
            })}
          </ul>
        </Section>
      </Layout>
    );
  }
}

CategoriesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired
        }).isRequired
      )
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    })
  })
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allGraphCmsPost(
      filter: {locale: {eq: it}, stage: {eq: PUBLISHED}}
      sort: {fields: categories___name, order: ASC}
    ) {
      group(field: categories___id) {
        field
        fieldValue
        totalCount
      }
    }
    allGraphCmsCategory(filter: {locale: {eq: it}, stage: {eq: PUBLISHED}}) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
