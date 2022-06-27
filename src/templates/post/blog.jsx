import React from "react"
import classNames from "classnames"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { groupify } from "@pittica/gatsby-plugin-utils"
import { Speakable } from "@pittica/gatsby-plugin-seo"
import { useTranslation } from "gatsby-plugin-react-i18next"

import PostContent from "../../components/ui/article/post-content"
import PostFooter from "../../components/ui/article/post-footer"
import PostMeta from "../../components/ui/article/post-meta"
import Icon from "../../components/ui/icon"
import PostNav from "../../components/nav/post-nav"
import Layout from "../../layouts/layout"

import { getCover, getSeoImage } from "../../utils/image"

import "../../scss/templates/post/_blog.scss"

export default function Blog({ data: { post, previous, next }, location }) {
  const { t } = useTranslation()

  return (
    <Layout
      blog={true}
      location={location}
      author={
        post.people && post.people.length > 0
          ? `${post.people[0].firstName} ${post.people[0].lastName}`
          : null
      }
      next={next ? `/blog/${next.slug}` : null}
      previous={previous ? `/blog/${previous.slug}` : null}
      breadcrumb={[
        {
          url: "/blog/",
          name: t("Blog"),
        },
      ]}
      image={getSeoImage(post)}
    >
      <Speakable
        selector={[".blog header h1.title", ".blog .post-content .content"]}
      />
      <article className="blog">
        <header className={classNames("hero", "is-fullheight")}>
          <GatsbyImage
            image={getCover(post, "cover")}
            alt={post.title}
            className="cover"
          />
          <div className="hero-body">
            <div className={classNames("container", "has-text-centered")}>
              <div>
                <h1 className="title">{post.title}</h1>
              </div>
              {post.description && (
                <div>
                  <h2 className="subtitle">{post.description}</h2>
                </div>
              )}
              {post.date && (
                <PostMeta>
                  <Icon glyph="icon-pittica-clock">{post.date}</Icon>
                </PostMeta>
              )}
              {post.categories && post.categories.length > 0 && (
                <PostMeta
                  title={
                    post.categories.length > 1 ? t("Categories") : t("Category")
                  }
                >
                  {post.categories.length > 0 && (
                    <div className="container">
                      {post.categories.map((category, i) => (
                        <Icon
                          key={`categories-${i}-${category.id}`}
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
      <PostFooter people={post.people} image={post.cover} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostTemplate(
    $slug: String!
    $next: String
    $previous: String
    $language: String!
  ) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: graphCmsPost(slug: { eq: $slug }, stage: { eq: PUBLISHED }) {
      remoteTypeName
      title
      slug
      description: excerpt
      date: formattedDate
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
      cover: image {
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
      image: seoImage {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 628)
          }
        }
      }
      seoImageFallback: image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 628)
          }
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
        phone
        linkedIn
        gitHub
        imdb
        email
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
