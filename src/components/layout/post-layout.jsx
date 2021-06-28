import React from "react"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Navbar from "../nav/navbar"
import Footer from "../ui/footer"
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
      <Navbar title={title} location={location} />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
