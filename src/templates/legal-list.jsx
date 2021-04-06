import React, { Component } from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';

import ListLayout from '../components/layout/list-layout';
import PageGrid from '../components/ui/article/page-grid';

export default class LegalListTemplate extends Component {
  render() {
    const { data, pageContext } = this.props;

    return (
      <ListLayout
        location={this.props.location}
        context={pageContext}
        title="Note Legali"
        description="Documenti e Condizioni di Fornitura Servizi"
      >
        <div className={classnames('columns', 'is-multiline')}>
          {data.allGraphCmsLegal.nodes.map((node) => {
            return (
              <div className={classnames('column', 'is-half')} key={node.slug}>
                <PageGrid node={node} group={pageContext.group} />
              </div>
            );
          })}
        </div>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query LegalListTemplate($skip: Int!, $limit: Int!) {
    allGraphCmsLegal(filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }, limit: $limit, skip: $skip) {
      nodes {
        id
        title
        slug
        description
      }
    }
  }
`;
