import React from 'react';
import classnames from 'classnames';

import ImagePost from './image/image-post';

export default function Card({ children, image, title, link }) {
  return (
    <div class="card">
      {image && (
        <div class="card-image">
          <figure class={classnames('image', 'is-square')}>
            <ImagePost image={image} title={title} link={link} />
          </figure>
        </div>
      )}
      <div class="card-content">
        <div class="content">{children}</div>
      </div>
    </div>
  );
}
