import React from "react"

import ArticleHeader from "./article-header"
import Hero from "../hero"

import "../../../scss/ui/article/_post-header.scss"

export default function PostHeader({
  post: { title, description },
  image,
  children,
}) {
  return (
    <ArticleHeader image={image} className="post-header">
      <Hero title={title} subtitle={description} className="post-data">
        {children}
      </Hero>
    </ArticleHeader>
  )
}
