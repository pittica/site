import React from 'react';
import classnames from 'classnames';

import ImagePost from './image/image-post';

import '../../scss/ui/_card.scss';

export default function Card({ children, image, title, link }) {
  return (
    <div className="card">
      {image && (
        <div className={classnames('card-image', image.localFile && image.localFile.extension ? image.localFile.extension.toLowerCase() : null)}>
          <figure className={classnames('image', 'is-square')}>
            <ImagePost image={image} title={title} link={link} />
          </figure>
        </div>
      )}
      {children && (
        <div className="card-content">
          <div className="content">{children}</div>
        </div>
      )}
    </div>
  );
}
