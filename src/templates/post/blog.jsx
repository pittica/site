import React from "react"
import { graphql, Link } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import Icon from "../../components/ui/icon"
import PostContent from "../../components/ui/article/post-content"
import PostFooter from "../../components/ui/article/post-footer"
import PostHeader from "../../components/ui/article/post-header"
import PostMeta from "../../components/ui/article/post-meta"
import PostNav from "../../components/nav/post-nav"
import PostLayout from "../../components/layout/post-layout"
import TagLink from "../../components/ui/link/tag-link"

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
      <PostHeader image={cover} post={post}>
        {post.categories && post.categories.length > 0 && (
          <PostMeta
            title={post.categories.length > 1 ? "Categorie" : "Categoria"}
          >
            <Icon className="icon-pittica-folder">
              {post.categories.map((category, index) => (
                <Link
                  to={`/category/${category.slug}`}
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
      <PostContent>{post.content}</PostContent>
      <PostNav previous={previous} next={next} />
      <PostFooter post={post} />
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
