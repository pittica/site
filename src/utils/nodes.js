require("dotenv").config()

const path = require("path")

exports.listfy = (
  group,
  slug,
  length,
  locale,
  stage,
  createPage,
  postsPerPage
) => {
  const limit = postsPerPage || parseInt(process.env.POSTS_PER_PAGE || 18)
  const pages = Math.ceil(length / limit)
  const pathParts = []

  if (group) {
    pathParts.push(group)
  }

  if (slug) {
    pathParts.push(slug)
  }

  const pathJoin = pathParts.join("/")

  Array.from({ length: pages }).forEach((_, i) =>
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
        stage,
        header: true,
      },
    })
  )
}

exports.postify = (group, nodes, locale, stage, createPage) => {
  nodes.forEach(({ slug }) =>
    createPage({
      path: `/${group}/${slug}`,
      component: path.resolve(`./src/templates/post/${group}.jsx`),
      context: {
        slug,
        group,
        locale,
        stage,
      },
    })
  )
}
