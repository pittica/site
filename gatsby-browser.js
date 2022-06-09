import React, { Fragment } from "react"
import { groupify } from "@pittica/gatsby-plugin-utils"

import Footer from "./src/components/ui/footer"
import Main from "./src/components/ui/main"
import TopMenu from "./src/components/nav/top-menu"
import SingleSeo from "./src/components/seo/single-seo"

import { getSeoImage } from "./src/utils/image"

import "./src/scss/style.scss"

export function wrapPageElement({
  element,
  props: {
    location,
    data,
    pageContext: { group },
  },
}) {
  const { post, previous, next } = data || {}

  return (
    <Fragment>
      {post && (
        <SingleSeo
          title={post.title}
          description={post.description}
          path={location.pathname}
          blog={post.remoteTypeName === "Post"}
          image={getSeoImage(post)}
          author={
            post.people && post.people.length > 0
              ? `${post.people[0].firstName} ${post.people[0].lastName}`
              : null
          }
          next={next ? groupify(next.slug, group) : null}
          previous={previous ? groupify(previous.slug, group) : null}
          headline={post.headline}
          date={post.date}
          group={group}
        />
      )}
      <TopMenu location={location} />
      <Main>{element}</Main>
      <Footer />
    </Fragment>
  )
}

export function onServiceWorkerUpdateReady() {
  window.location.reload(true)
}
