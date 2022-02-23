import React from "react"
import classNames from "classnames"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import PostContent from "../../components/ui/article/post-content"
import PostFooter from "../../components/ui/article/post-footer"
import PostMeta from "../../components/ui/article/post-meta"
import Icon from "../../components/ui/icon"
import PostNav from "../../components/nav/post-nav"
import Layout from "../../layouts/layout"

import { groupify } from "@pittica/gatsby-plugin-utils"

import getCoverFallback from "../../utils/get-cover-fallback"
import getCover from "../../utils/get-cover"

import "../../scss/templates/post/_blog.scss"

export default function Blog({ data: { post, previous, next }, location }) {
  const cover = getCover(post)

  return (
    <Layout
      title={post.title}
      description={post.description}
      blog={true}
      image={getCoverFallback(post)}
      post={post}
      location={location}
      author={
        post.people && post.people.length > 0 ? post.people[0].name : null
      }
      next={next ? `/blog/${next.slug}` : null}
      previous={previous ? `/blog/${previous.slug}` : null}
    >
      <article className="blog">
        <header className={classNames("hero", "is-fullheight")}>
          <GatsbyImage image={cover} alt={post.title} className="cover" />
          <div className="hero-body">
            <div className={classNames("container", "has-text-centered")}>
              <h1 className="title">{post.title}</h1>
              {post.description && (
                <h2 className="subtitle">{post.description}</h2>
              )}
              {post.date && (
                <PostMeta>
                  <Icon glyph="icon-pittica-clock">{post.date}</Icon>
                </PostMeta>
              )}
              {post.categories && post.categories.length > 0 && (
                <PostMeta
                  title={post.categories.length > 1 ? "Categorie" : "Categoria"}
                >
                  {post.categories.length > 0 && (
                    <div className="container">
                      {post.categories.map((category, i) => (
                        <Icon
                          key={`tags-${i}-${category.id}`}
                          glyph="icon-pittica-folder"
                        >
                          <Link
                            to={groupify(category.slug, "categories")}
                            title={category.name}
                          >
                            {category.name}
                          </Link>
                        </Icon>
                      ))}
                    </div>
                  )}
                </PostMeta>
              )}
              <Icon
                glyph="icon-pittica-arrow-down"
                className={classNames("is-large", "has-text-light")}
              />
            </div>
          </div>
          {post.tags.length > 0 && (
            <div className="hero-foot">
              <nav className={classNames("tabs", "is-boxed")}>
                <div className="container">
                  <ul>
                    {post.tags.map((tag, i) => (
                      <li key={`tags-${i}-${tag.id}`}>
                        <Link to={groupify(tag.slug, "tags")} title={tag.name}>
                          <Icon
                            glyph="icon-pittica-tag"
                            className="has-text-primary"
                          >
                            {tag.name}
                          </Icon>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          )}
        </header>
        <PostContent content={post.content} />
      </article>
      <PostNav previous={previous} next={next} />
      <PostFooter post={post} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostTemplate($slug: String!, $next: String, $previous: String) {
    post: graphCmsPost(slug: { eq: $slug }, stage: { eq: PUBLISHED }) {
      id
      title
      date: formattedDate
      description: excerpt
      content {
        html
      }
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 1920
              height: 1080
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        credits {
          html
        }
      }
      people {
        id
        firstName
        lastName
        roles {
          name
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 240
                height: 240
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
    next: graphCmsPost(id: { eq: $next }, stage: { eq: PUBLISHED }) {
      id
      title
      slug
    }
    previous: graphCmsPost(id: { eq: $previous }, stage: { eq: PUBLISHED }) {
      id
      title
      slug
    }
  }
`
