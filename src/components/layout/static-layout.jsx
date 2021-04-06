import React from 'react';
import classnames from 'classnames';

import ListLayout from './list-layout';
import StaticGrid from '../ui/article/static-grid';

export default function StaticLayout({ nodes, context, location, title, description }) {
  return (
    <ListLayout location={location} context={context} title={title} description={description}>
      <div className={classnames('columns', 'is-multiline')}>
        {nodes.map((node) => {
          return (
            <div className={classnames('column', 'is-one-third')} key={node.slug}>
              <StaticGrid node={node} group={context.group} />
            </div>
          );
        })}
      </div>
    </ListLayout>
  );
}
