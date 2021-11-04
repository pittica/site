import React from "react"
import PropTypes from "prop-types"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Footer from "../components/ui/footer"
import Main from "../components/ui/main"
import TopMenu from "../components/nav/top-menu"

export default function Layout({
  children,
  location,
  title,
  description,
  image,
  blog,
  post,
  author,
}) {
  return (
    <div>
      <Seo
        title={title}
        description={description}
        path={location.pathname}
        isBlogPost={blog}
        image={image}
        postData={post}
        author={author}
      />
      <TopMenu location={location} />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  blog: PropTypes.bool,
  post: PropTypes.object,
  author: PropTypes.string,
}

Layout.defaultProps = {
  blog: false,
}
