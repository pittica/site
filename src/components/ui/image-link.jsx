import React from 'react';

import Image from './image';

function ImageContent({ image, title, size }) {
  if (image && image.localFile) {
    return <Image src={image.localFile.publicURL} title={title} size={size || 96} />;
  } else {
    return title;
  }
}

function ImageLink({ link, title, image, size }) {
  if (link) {
    return (
      <a href={link} title={title} target="_system">
        <ImageContent image={image} title={title} size={size} />
      </a>
    );
  } else {
    return ImageContent({ image, title, size });
  }
}

export default ImageLink;
