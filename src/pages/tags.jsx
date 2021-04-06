import React, { Component } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout/layout';
import Section from '../components/ui/section';
import TagLink from '../components/ui/link/tag-link';

class TagsPage extends Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={siteTitle}>
        <Section title="Tag">
          <ul className="page-list">
            {data.allMarkdownRemark.group.map((node, index) => {
              return (
                <li key={'tag-' + index}>
                  <TagLink tag={node.fieldValue} /> ({node.totalCount})
                </li>
              );
            })}
          </ul>
        </Section>
      </Layout>
    );
  }
}

export default TagsPage;

TagsPage.propTypes = {
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
      sort: {fields: tags___name, order: ASC}
    ) {
      group(field: tags___id) {
        field
        fieldValue
        totalCount
      }
    }
    allGraphCmsTag(filter: {locale: {eq: it}, stage: {eq: PUBLISHED}}) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
