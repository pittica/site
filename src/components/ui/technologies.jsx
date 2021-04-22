import React from 'react';
import classnames from 'classnames';

import ImageLink from './image/image-link';

export default function Technologies({ nodes }) {
  return (
    <div className={classnames('columns', 'is-multiline', 'is-mobile')}>
      {nodes.map((node, i) => {
        return (
          <div className={classnames('column', 'is-6-mobile', 'is-3-tablet', 'is-2-fullhd')} key={`technology-${i}`}>
            <ImageLink link={node.link} title={node.name} image={node.logo} size={96} />
          </div>
        );
      })}
    </div>
  );
}
