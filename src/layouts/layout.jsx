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
  author,
  header,
  next,
  previous,
  breadcrumb,
  headline,
}) {
  return (
    <Fragment>
      <Seo
        title={title}
        description={description}
        path={location.pathname}
        isBlogPost={blog}
        image={image}
        author={author}
        next={next}
        previous={previous}
        breadcrumb={breadcrumb}
        headline={headline}
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
  author: PropTypes.string,
  header: PropTypes.bool,
  next: PropTypes.string,
  previous: PropTypes.string,
  breadcrumb: PropTypes.arrayOf(PropTypes.object),
  headline: PropTypes.string,
}

Layout.defaultProps = {
  blog: false,
  header: false,
  breadcrumb: [],
}
