import React from 'react';
import { Link } from 'gatsby';

import '../../../scss/ui/link/_feature-link.scss';

export default function FeatureLink({ to, label }) {
  return (
    <Link to={to} className="feature-link">
      <span>{label}</span>
    </Link>
  );
}
