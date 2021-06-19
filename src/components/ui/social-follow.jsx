import React from 'react';
import { SocialFollow as Follow } from '@pittica/gatsby-plugin-seo';

import '../../scss/ui/_social-follow.scss';

export default function SocialFollow({ className }) {
  return <Follow className={className} />;
}
