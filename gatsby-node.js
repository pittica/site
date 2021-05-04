require('dotenv').config();

const path = require('path');
const moment = require('moment');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const { data: { pages, posts, categories, tags, portfolio, services, offers, legals } } = await graphql(`{
    pages: allGraphCmsPage(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
    ) {
      nodes {
        id
        slug
        updatedAt
      }
    }
    posts: allGraphCmsPost(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
      sort: { fields: date, order: DESC }
    ) {
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
    }
    categories: allGraphCmsCategory(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
    ) {
      edges {
        node {
          name
          slug
          posts {
            id
          }
          updatedAt
        }
      }
    }
    tags: allGraphCmsTag(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
    ) {
      edges {
        node {
          name
          slug
          posts {
            id
          }
          updatedAt
        }
      }
    }
    portfolio: allGraphCmsPortfolio(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
    ) {
      nodes {
        slug
        updatedAt
      }
      totalCount
    }
    services: allGraphCmsService(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
    ) {
      nodes {
        slug
        updatedAt
      }
      totalCount
    }
    offers: allGraphCmsOffer(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
    ) {
      nodes {
        slug
        updatedAt
      }
      totalCount
    }
    legals: allGraphCmsLegal(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
    ) {
      nodes {
        slug
        updatedAt
      }
      totalCount
    }
  }`);

  pages.nodes.forEach(({ slug, updatedAt }) => {
    createPage({
      path: `/${slug}`,
      component: path.resolve(`./src/templates/page.jsx`),
      context: {
        slug,
        updatedAt,
        group: 'page'
      }
    });
  });

  posts.edges.forEach(({ node: { slug, updatedAt }, previous, next }) => {
    createPage({
      path: `/blog/${slug}`,
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: {
        slug,
        previous,
        next,
        updatedAt,
        group: 'post'
      }
    });
  });

  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE || 18);
  const blogPages = Math.ceil(posts.edges.length / postsPerPage);

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve(`./src/templates/blog-list.jsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        pages: blogPages,
        current: i + 1,
        group: 'blog'
      }
    });
  });

  const listfy = (group, slug, length) => {
    const pages = Math.ceil(length / postsPerPage);
    const pathParts = [];

    if (group) {
      pathParts.push(group);
    }

    if (slug) {
      pathParts.push(slug);
    }

    const pathJoin = pathParts.join('/');

    Array.from({ length: pages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${pathJoin}` : `/${pathJoin}/${i + 1}`,
        component: path.resolve(`./src/templates/${group || slug}-list.jsx`),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          pages,
          current: i + 1,
          slug,
          group
        }
      });
    });
  };

  const postify = (group, nodes) => {
    nodes.forEach(({ slug }) => {
      createPage({
        path: `/${group}/${slug}`,
        component: path.resolve(`./src/templates/${group}-post.jsx`),
        context: {
          slug,
          group
        }
      });
    });
  };

  categories.edges.forEach(({ node: { slug, posts } }) => {
    listfy('category', slug, posts.length);
  });

  tags.edges.forEach(({ node: { slug, posts } }) => {
    listfy('tag', slug, posts.length);
  });

  listfy('portfolio', null, portfolio.totalCount);
  listfy('services', null, services.totalCount);
  listfy('offers', null, offers.totalCount);
  listfy('legal', null, legals.totalCount);

  postify('portfolio', portfolio.nodes);
  postify('services', services.nodes);
  postify('offers', offers.nodes);
  postify('legal', legals.nodes);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GraphCMS_Post: {
      formattedDate: {
        type: 'String',
        resolve: (source) => {
          const date = new Date(source.date);
          const m = moment(date);
          m.locale(process.env.LOCALE);

          return m.format('l');
        }
      }
    }
  };

  createResolvers(resolvers);
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find((plugin) => plugin.constructor.name === 'MiniCssExtractPlugin');

    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }

    actions.replaceWebpackConfig(config);
  }
};
