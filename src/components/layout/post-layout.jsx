import React from "react"
import PropTypes from "prop-types"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Footer from "../ui/footer"
import TopMenu from "../nav/top-menu"
import Main from "../ui/main"

import "../../scss/layout/_post-layout.scss"

export default function PostLayout({ location, title, children, post, image }) {
  return (
    <div className="post-layout">
      <Seo
        title={title}
        description={post.description || post.subtitle || post.excerpt}
        isBlogPost={true}
        image={image}
        postData={post}
        path={location.pathname}
      />
      <TopMenu location={location} />
      <Main>
        <article className="blog-post">{children}</article>
      </Main>
      <Footer />
    </div>
  )
}

PostLayout.propTypes = {
  location: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.any,
  post: PropTypes.object,
  image: PropTypes.string,
}
