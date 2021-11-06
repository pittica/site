import React from "react"
import PropTypes from "prop-types"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Header from "../components/ui/header"
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
  header,
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
      {header && <Header title={title} subtitle={description} sticky={true} />}
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  context: PropTypes.object,
  location: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  blog: PropTypes.bool,
  post: PropTypes.object,
  author: PropTypes.string,
  header: PropTypes.bool,
}

Layout.defaultProps = {
  blog: false,
  header: false,
}
