import React from 'react';
import { Link } from 'gatsby';

import ImageSwitch from './image-switch';

export default function ImagePost({ image: { localFile }, title, link }) {
  if (localFile) {
    if (link) {
      return (
        <Link to={link}>
          <ImageSwitch title={title} image={localFile} />
        </Link>
      );
    } else {
      return <ImageSwitch title={title} image={localFile} />;
    }
  } else {
    return null;
  }
}
