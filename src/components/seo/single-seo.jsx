import React from "react"
import PropTypes from "prop-types"
import { Seo } from "@pittica/gatsby-plugin-seo"
import { groupify } from "@pittica/gatsby-plugin-utils"

export default function SingleSeo({
  title,
  description,
  path,
  blog,
  image,
  author,
  next,
  previous,
  headline,
  date,
  group,
}) {
  const breadcrumb = []

  if (group) {
    breadcrumb.push({
      url: groupify(group),
      name: group,
    })
  }

  return (
    <Seo
      title={title}
      description={description}
      path={path}
      isBlogPost={blog}
      image={image}
      author={author}
      next={next}
      previous={previous}
      headline={headline}
      datePublished={date}
    />
  )
}

SingleSeo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  blog: PropTypes.bool,
  image: PropTypes.string,
  author: PropTypes.string,
  next: PropTypes.string,
  previous: PropTypes.string,
  headline: PropTypes.string,
  date: PropTypes.string,
  group: PropTypes.string,
}

SingleSeo.defaultProps = {
  blog: false,
}
