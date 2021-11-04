import React from "react"
import PropTypes from "prop-types"

import Layout from "../../layouts/layout"

import "../../scss/layout/_post-layout.scss"

export default function PostLayout({
  location,
  title,
  children,
  post,
  image,
  author,
}) {
  return (
    <Layout
      title={title}
      description={post.description || post.subtitle || post.excerpt}
      blog={true}
      image={image}
      post={post}
      location={location}
      author={author}
    >
      <article className="post-layout">{children}</article>
    </Layout>
  )
}

PostLayout.propTypes = {
  location: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.any,
  post: PropTypes.object,
  image: PropTypes.string,
  author: PropTypes.string,
}
