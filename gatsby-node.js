require("dotenv").config()

const fs = require("fs")
const path = require("path")
const moment = require("moment")
const {
  createRemoteFileNode,
  createFilePath,
} = require("gatsby-source-filesystem")
const { fileCategory, commalify } = require("@pittica/gatsby-plugin-utils")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
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
  } = await graphql(`
    {
      pages: allGraphCmsPage(
        filter: { locale: { eq: ${process.env.LOCALE} }, stage: { eq: PUBLISHED } }
      ) {
        nodes {
          id
          slug
          updatedAt
          locale
        }
      }
      posts: allGraphCmsPost(
        filter: { locale: { eq: ${process.env.LOCALE} }, stage: { eq: PUBLISHED } }
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
            }
            next {
              id
              slug
              title
            }
            previous {
              id
              slug
              title
            }
          }
          totalCount
          locale: fieldValue
        }
      }
      categories: allGraphCmsCategory(
        filter: { locale: { eq: ${process.env.LOCALE} }, stage: { eq: PUBLISHED } }
      ) {
        nodes {
          name
          slug
          posts {
            id
          }
          updatedAt
          locale
        }
      }
      tags: allGraphCmsTag(
        filter: { locale: { eq: ${process.env.LOCALE} }, stage: { eq: PUBLISHED } }
      ) {
        nodes {
          name
          slug
          posts {
            id
          }
          updatedAt
          locale
        }
      }
      portfolio: allGraphCmsPortfolio(
        filter: { locale: { eq: ${process.env.LOCALE} }, stage: { eq: PUBLISHED } }
      ) {
        group(field: locale) {
          nodes {
            slug
            updatedAt
            locale
          }
          totalCount
          locale: fieldValue
        }
      }
      services: allGraphCmsService(
        filter: { locale: { eq: ${process.env.LOCALE} }, stage: { eq: PUBLISHED } }
      ) {
        group(field: locale) {
          nodes {
            slug
            updatedAt
            locale
          }
          totalCount
          locale: fieldValue
        }
      }
      offers: allGraphCmsOffer(
        filter: { locale: { eq: ${process.env.LOCALE} }, stage: { eq: PUBLISHED } }
      ) {
        group(field: locale) {
          nodes {
            slug
            updatedAt
            locale
          }
          totalCount
          locale: fieldValue
        }
      }
      legals: allGraphCmsLegal(
        filter: { locale: { eq: ${process.env.LOCALE} }, stage: { eq: PUBLISHED } }
      ) {
        group(field: locale) {
          nodes {
            slug
            updatedAt
            locale
          }
          totalCount
          locale: fieldValue
        }
      }
    }
  `)

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

  const limit = parseInt(process.env.POSTS_PER_PAGE || 18)

  const listfy = (group, slug, length, locale) => {
    const pages = Math.ceil(length / limit)
    const pathParts = []

    if (group) {
      pathParts.push(group)
    }

    if (slug) {
      pathParts.push(slug)
    }

    const pathJoin = pathParts.join("/")

    Array.from({ length: pages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${pathJoin}` : `/${pathJoin}/${i + 1}`,
        component: path.resolve(`./src/templates/list/${group || slug}.jsx`),
        context: {
          limit,
          skip: i * limit,
          pages,
          current: i + 1,
          slug,
          group,
          locale,
        },
      })
    })
  }

  const postify = (group, nodes, locale) => {
    nodes.forEach(({ slug }) => {
      createPage({
        path: `/${group}/${slug}`,
        component: path.resolve(`./src/templates/post/${group}.jsx`),
        context: {
          slug,
          group,
          locale,
        },
      })
    })
  }

  posts.group.forEach(({ edges, totalCount, locale }) => {
    edges.forEach(({ node: { slug, updatedAt }, previous, next }) => {
      createPage({
        path: `/blog/${slug}`,
        component: path.resolve(`./src/templates/post/blog.jsx`),
        context: {
          slug,
          previous,
          next,
          updatedAt,
          group: "blog",
          locale,
        },
      })
    })

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

  const wrapperify = (nodes, group, title, icon) => {
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
  }

  wrapperify(categories.nodes, "categories", "Categorie", "folder")
  wrapperify(tags.nodes, "tags", "Tag", "tag")

  categories.nodes.forEach(({ slug, posts, locale }) => {
    listfy("categories", slug, posts.length, locale)
  })

  tags.nodes.forEach(({ slug, posts, locale }) => {
    listfy("tags", slug, posts.length, locale)
  })

  portfolio.group.forEach(({ nodes, locale, totalCount }) => {
    listfy("portfolio", null, totalCount, locale)
    postify("portfolio", nodes, locale)
  })

  services.group.forEach(({ nodes, locale, totalCount }) => {
    listfy("services", null, totalCount, locale)
    postify("services", nodes, locale)
  })

  offers.group.forEach(({ nodes, locale, totalCount }) => {
    listfy("offers", null, totalCount, locale)
    postify("offers", nodes, locale)
  })

  legals.group.forEach(({ nodes, locale, totalCount }) => {
    listfy("legal", null, totalCount, locale)
    postify("legal", nodes, locale)
  })
}

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
    GraphCMS_Asset: {
      category: {
        type: "String",
        resolve: ({ fileName }) => {
          if (fileName) {
            return fileCategory(path.extname(fileName))
          }

          return null
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createNodeId,
  getCache,
  cache,
}) => {
  if (node.remoteTypeName === "Asset" && !node.mimeType.includes("image/")) {
    try {
      const ext = path.extname(node.fileName)
      const fileNode = await createRemoteFileNode({
        url: node.url,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        getCache,
        ...(node.fileName && { name: path.basename(node.fileName, ext), ext }),
      })

      if (fileNode) {
        node.localFile = fileNode.id
      }
    } catch (e) {
      console.error("graphcms", e)
    }
  }
}
