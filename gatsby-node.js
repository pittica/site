require("dotenv").config()

const path = require("path")
const moment = require("moment")
const { fileCategory } = require("@pittica/gatsby-plugin-utils")

const { createAsset } = require("./src/utils/filesystem")
const { listfy, postify } = require("./src/utils/nodes")

exports.createPages = ({ graphql, actions: { createPage } }) =>
  graphql(
    `
      query GatsbyNode($stage: GraphCMS_Stage) {
        pages: allGraphCmsPage(filter: { stage: { eq: $stage } }) {
          nodes {
            id
            slug
            updatedAt
            locale
            stage
          }
        }
        posts: allGraphCmsPost(
          filter: { stage: { eq: $stage } }
          sort: { fields: date, order: DESC }
        ) {
          group(field: locale) {
            edges {
              node {
                slug
                categories {
                  id
                  name
                  slug
                }
                tags {
                  id
                  name
                  slug
                }
                updatedAt
                locale
                stage
              }
              next {
                id
              }
              previous {
                id
              }
            }
            totalCount
            locale: fieldValue
          }
        }
        categories: allGraphCmsCategory(
          filter: {
            stage: { eq: $stage }
            posts: { elemMatch: { stage: { eq: $stage } } }
          }
        ) {
          nodes {
            name
            slug
            posts {
              id
            }
            updatedAt
            locale
            stage
          }
        }
        tags: allGraphCmsTag(
          filter: {
            stage: { eq: $stage }
            posts: { elemMatch: { stage: { eq: $stage } } }
          }
        ) {
          nodes {
            name
            slug
            posts {
              id
            }
            updatedAt
            locale
            stage
          }
        }
        portfolio: allGraphCmsPortfolio(filter: { stage: { eq: $stage } }) {
          group(field: locale) {
            nodes {
              slug
              updatedAt
              locale
              stage
            }
            totalCount
            locale: fieldValue
          }
        }
        services: allGraphCmsService(filter: { stage: { eq: $stage } }) {
          group(field: locale) {
            nodes {
              slug
              updatedAt
              locale
              stage
            }
            totalCount
            locale: fieldValue
          }
        }
        offers: allGraphCmsOffer(filter: { stage: { eq: $stage } }) {
          group(field: locale) {
            nodes {
              slug
              updatedAt
              locale
              stage
            }
            totalCount
            locale: fieldValue
          }
        }
        legals: allGraphCmsLegal(filter: { stage: { eq: $stage } }) {
          group(field: locale) {
            nodes {
              slug
              updatedAt
              locale
              stage
            }
            totalCount
            locale: fieldValue
          }
        }
      }
    `,
    { stage: "PUBLISHED" }
  ).then(
    ({
      data: {
        pages,
        posts,
        categories,
        tags,
        portfolio,
        services,
        offers,
        legals,
      },
    }) => {
      pages.nodes.forEach(({ slug, updatedAt, locale }) => {
        createPage({
          path: `/${slug}`,
          component: path.resolve(`./src/templates/page.jsx`),
          context: {
            slug,
            updatedAt,
            group: "page",
            locale,
          },
        })
      })

      posts.group.forEach(({ edges, totalCount, locale }) => {
        edges.forEach(({ node: { slug, updatedAt }, previous, next }) => {
          createPage({
            path: `/blog/${slug}`,
            component: path.resolve(`./src/templates/post/blog.jsx`),
            context: {
              slug,
              previous: previous ? previous.id : null,
              next: next ? next.id : null,
              updatedAt,
              group: "blog",
              locale,
            },
          })
        })

        const limit = parseInt(process.env.POSTS_PER_PAGE || 18)
        const blogPages = Math.ceil(totalCount / limit)

        Array.from({ length: blogPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: path.resolve(`./src/templates/list/blog.jsx`),
            context: {
              limit,
              skip: i * limit,
              pages: blogPages,
              current: i + 1,
              group: "blog",
              locale,
            },
          })
        })
      })

      const wrapperify = (nodes, group, title, icon) =>
        createPage({
          path: `/${group}`,
          component: path.resolve(`./src/templates/list.jsx`),
          context: {
            group,
            title,
            icon,
            nodes: nodes.map(({ name, slug, posts, locale }) => ({
              name,
              slug,
              count: posts.length,
              locale,
            })),
          },
        })

      wrapperify(categories.nodes, "categories", "Categorie", "folder")
      wrapperify(tags.nodes, "tags", "Tag", "tag")

      categories.nodes.forEach(({ slug, posts, locale, stage }) => {
        listfy("categories", slug, posts.length, locale, stage, createPage)
      })

      tags.nodes.forEach(({ slug, posts, locale, stage }) => {
        listfy("tags", slug, posts.length, locale, stage, createPage)
      })

      portfolio.group.forEach(({ nodes, locale, stage, totalCount }) => {
        listfy("portfolio", null, totalCount, locale, stage, createPage)
        postify("portfolio", nodes, locale, stage, createPage)
      })

      services.group.forEach(({ nodes, locale, stage, totalCount }) => {
        listfy("services", null, totalCount, locale, stage, createPage)
        postify("services", nodes, locale, stage, createPage)
      })

      offers.group.forEach(({ nodes, locale, stage, totalCount }) => {
        listfy("offers", null, totalCount, locale, stage, createPage)
        postify("offers", nodes, locale, stage, createPage)
      })

      legals.group.forEach(({ nodes, locale, stage, totalCount }) => {
        listfy("legal", null, totalCount, locale, stage, createPage)
        postify("legal", nodes, locale, stage, createPage)
      })
    }
  )

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GraphCMS_Post: {
      formattedDate: {
        type: "String",
        resolve: ({ date, locale }) => {
          const m = moment(new Date(date))
          m.locale(locale)

          return m.format("l")
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.createSchemaCustomization = async ({ actions: { createTypes } }) => {
  createTypes(`
    type GraphCMS_Asset implements Node {
      localFile: File @link(from: "fields.localFile")
      fileCategory: String
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
  cache,
}) => {
  switch (node.remoteTypeName) {
    case "Asset":
      const fileNode = await createAsset(
        node,
        createNode,
        createNodeId,
        getCache,
        cache
      )

      if (fileNode) {
        createNodeField({ node, name: "localFile", value: fileNode.id })
        createNodeField({
          node,
          name: "fileCategory",
          value: fileCategory(fileNode.ext),
        })
      }

      return
  }
}
