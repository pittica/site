import React from 'react';

import Image from './image';

function ImageContent({ image, title, size, className }) {
  if (image && image.localFile) {
    return <Image src={image.localFile.publicURL} title={title} size={size} className={className} />;
  } else {
    return title;
  }
}

function ImageLink({ link, title, image, size, className }) {
  if (link) {
    return (
      <a href={link} title={title} target="_system">
        <ImageContent image={image} title={title} size={size} className={className} />
      </a>
    );
  } else {
    return <ImageContent image={image} title={title} size={size} className={className} />;
  }
}

export default ImageLink;
