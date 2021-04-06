import React from 'react';
import { Link } from 'gatsby';

export default function CategoryLink({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="category-link">
      <span>
        <i className="icon-pittica-folder" /> {category.name}
      </span>
    </Link>
  );
}
