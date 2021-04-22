import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

function ImageSwitch({ image, title }) {
  if (image) {
    if (image.extension && image.extension.toLowerCase() === 'svg') {
      return <img src={image.publicURL} alt={title} width="640" height="440" className="svg" />;
    } else {
      const sharp = getImage(image.childImageSharp);

      if (sharp) {
        return <GatsbyImage image={sharp} alt={title} />;
      }
    }
  }

  return null;
}

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
