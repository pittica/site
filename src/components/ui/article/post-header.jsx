import React from 'react';
import slugify from 'slug';
import { Link } from 'gatsby';

import Hero from '../hero';
import ArticleHeader from './article-header';
import { pathify } from '../../../utils/pathify';

import '../../../scss/ui/article/_post-header.scss';

export default function PostHeader({ post: { frontmatter: { title, description, date, categories } }, image }) {
  let cat;

  if (categories) {
    if (categories instanceof Array) {
      cat = categories;
    } else {
      cat = [ categories ];
    }
  } else {
    cat = [];
  }

  return (
    <ArticleHeader image={image} className="post-header">
      <Hero title={title} subtitle={description} className="post-data">
        {cat.length > 0 && (
          <div className="post-meta" title={cat.length > 1 ? 'Categorie' : 'Categoria'}>
            <span className="icon-text">
              <span className="icon">
                <i className="icon-pittica-folder" />
              </span>
              <span>
                {cat.map((category, index) => (
                  <Link to={pathify('category', slugify(category, { lower: true }))} key={'category-' + index}>
                    {category}
                  </Link>
                ))}
              </span>
            </span>
          </div>
        )}
        {date && (
          <div className="post-meta">
            <i className="icon-pittica-clock" /> {date}
          </div>
        )}
      </Hero>
    </ArticleHeader>
  );
}
