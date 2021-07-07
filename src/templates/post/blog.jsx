import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import classnames from "classnames"
import { commalify } from "@pittica/gatsby-plugin-utils"

import Renderer from "../../mdx/renderer"
import PostNav from "../../components/nav/post-nav"
import PostLayout from "../../components/layout/post-layout"
import TagLink from "../../components/ui/link/tag-link"
import Section from "../../components/ui/section"
import PostHeader from "../../components/ui/article/post-header"
import ImagePost from "../../components/ui/image/image-post"

export default function Blog({
  data: { post },
  pageContext: { previous, next },
  location,
}) {
  const image = post.image ? getImage(post.image.localFile) : null
  const cover = image ? image.images.fallback.src : null

  return (
    <PostLayout
      title={post.title}
      image={cover}
      post={post}
      location={location}
    >
      <article className="blog-post">
        <PostHeader image={cover} post={post} />
        {post.tags.length > 0 && (
          <div className="container">
            {post.tags.map((tag, index) => (
              <TagLink tag={tag} key={"tag" + index} />
            ))}
          </div>
        )}
        <div className="container">
          <section className="post-content">
            <Renderer>{post.content}</Renderer>
          </section>
        </div>
      </article>
      <PostNav previous={previous} next={next} />
      <Section>
        <h3 className="title">Credits</h3>
        <div className="columns">
          {post.people.length > 0 && (
            <div className="column">
              {post.people.map((person, index) => (
                <div className="columns" key={"person" + index}>
                  <div className={classnames("column", "is-3")}>
                    <figure className={classnames("image", "is-square")}>
                      <ImagePost image={person.image} title={person.name} />
                    </figure>
                  </div>
                  <div className={classnames("column", "is-9")}>
                    <h5 className="subtitle">{person.name}</h5>
                    {person.roles.length > 0 && (
                      <span>{commalify(person.roles)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {post.image.credits && (
            <div className={classnames("column", "has-text-right")}>
              <h3 className="title">Cover</h3>
              <Renderer>{post.image.credits}</Renderer>
            </div>
          )}
        </div>
      </Section>
    </PostLayout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $locale: GraphCMS_Locale!) {
    post: graphCmsPost(
      slug: { eq: $slug }
      stage: { eq: PUBLISHED }
      locale: { eq: $locale }
    ) {
      id
      title
      date: formattedDate
      excerpt
      content {
        markdownNode {
          childMdx {
            body
          }
        }
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
          markdownNode {
            childMdx {
              body
            }
          }
        }
      }
      people {
        name
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
  }
`
