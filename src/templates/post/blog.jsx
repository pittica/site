import React from "react"
import { graphql, Link } from "gatsby"

import PostContent from "../../components/ui/article/post-content"
import PostFooter from "../../components/ui/article/post-footer"
import PostHeader from "../../components/ui/article/post-header"
import PostMeta from "../../components/ui/article/post-meta"
import TagLink from "../../components/ui/link/tag-link"
import Icon from "../../components/ui/icon"
import PostNav from "../../components/nav/post-nav"
import Layout from "../../layouts/layout"

import getCoverFallback from "../../utils/get-cover-fallback"

export default function Blog({
  data: { post },
  pageContext: { previous, next },
  location,
}) {
  const cover = getCoverFallback(post)

  return (
    <Layout
      title={post.title}
      description={post.excerpt}
      blog={true}
      image={cover}
      post={post}
      location={location}
      author={
        post.people && post.people.length > 0 ? post.people[0].name : null
      }
    >
      <article>
        <PostHeader image={cover} post={post}>
          {post.categories && post.categories.length > 0 && (
            <PostMeta
              title={post.categories.length > 1 ? "Categorie" : "Categoria"}
            >
              <Icon className="icon-pittica-folder">
                {post.categories.map((category, index) => (
                  <Link
                    to={`/categories/${category.slug}`}
                    key={"category-" + index}
                  >
                    {category.name}
                  </Link>
                ))}
              </Icon>
            </PostMeta>
          )}
          {post.date && (
            <PostMeta>
              <Icon className="icon-pittica-clock">{post.date}</Icon>
            </PostMeta>
          )}
        </PostHeader>
        {post.tags.length > 0 && (
          <div className="container">
            {post.tags.map((tag, index) => (
              <TagLink tag={tag} key={"tag" + index} />
            ))}
          </div>
        )}
        <PostContent content={post.content} />
      </article>
      <PostNav previous={previous} next={next} />
      <PostFooter post={post} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostTemplate($slug: String!, $locale: GraphCMS_Locale!) {
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
        id
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
