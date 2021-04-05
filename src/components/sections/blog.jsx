import React, { Component } from 'react';
import classnames from 'classnames';

import Section from '../ui/section';
import ArticleGrid from '../ui/article/article-grid';

export default class Blog extends Component {
  render() {
    if (this.props.posts.length > 0) {
      return (
        <Section title="Blog" subtitle="Pittica says" link="/blog">
          <div className={classnames('columns', 'is-multiline')}>
            {this.props.posts.map(({ node }) => {
              return (
                <div className={classnames('column', 'is-one-third')} key={node.fields.slug}>
                  <ArticleGrid node={node} />
                </div>
              );
            })}
          </div>
        </Section>
      );
    } else {
      return null;
    }
  }
}
