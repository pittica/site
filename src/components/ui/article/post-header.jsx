import React from "react"
import { Link } from "gatsby"

import Hero from "../hero"
import ArticleHeader from "./article-header"

import "../../../scss/ui/article/_post-header.scss"

export default function PostHeader({
  post: { title, description, date, categories },
  image,
}) {
  return (
    <ArticleHeader image={image} className="post-header">
      <Hero title={title} subtitle={description} className="post-data">
        {categories && categories.length > 0 && (
          <div
            className="post-meta"
            title={categories.length > 1 ? "Categorie" : "Categoria"}
          >
            <span className="icon-text">
              <span className="icon">
                <i className="icon-pittica-folder" />
              </span>
              <span>
                {categories.map((category, index) => (
                  <Link
                    to={`/category/${category.slug}`}
                    key={"category-" + index}
                  >
                    {category.name}
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
  )
}
