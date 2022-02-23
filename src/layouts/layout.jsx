import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Header from "../components/ui/header"
import Main from "../components/ui/main"

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
  next,
  previous,
}) {
  return (
    <Fragment>
      <Seo
        title={title}
        description={description}
        path={location.pathname}
        isBlogPost={blog}
        image={image}
        postData={post}
        author={author}
        next={next}
        previous={previous}
      />
      {header && <Header title={title} subtitle={description} sticky={true} />}
      <Main>{children}</Main>
    </Fragment>
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
  next: PropTypes.string,
  previous: PropTypes.string,
}

Layout.defaultProps = {
  blog: false,
  header: false,
}
