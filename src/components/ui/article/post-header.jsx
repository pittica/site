import React from "react"
import PropTypes from "prop-types"

import ArticleHeader from "./article-header"
import Hero from "../hero"

import "../../../scss/ui/article/_post-header.scss"

export default function PostHeader({ title, description, image, children }) {
  return (
    <ArticleHeader image={image} className="post-header">
      <Hero title={title} subtitle={description} className="post-data">
        {children}
      </Hero>
    </ArticleHeader>
  )
}

PostHeader.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}
