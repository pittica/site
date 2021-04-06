import React from 'react';
import classnames from 'classnames';

import Section from '../ui/section';
import ArticleGrid from '../ui/article/article-grid';

export default function Blog({ posts }) {
  if (posts.length > 0) {
    return (
      <Section title="Blog" subtitle="Pittica says" link="/blog">
        <div className={classnames('columns', 'is-multiline')}>
          {posts.map(({ node }) => {
            return (
              <div className={classnames('column', 'is-one-third')} key={node.slug}>
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
