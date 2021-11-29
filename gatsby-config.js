require("dotenv").config()

const { commalify } = require("@pittica/gatsby-plugin-utils")

const siteUrl = process.env.URL || `https://${process.env.HOST}`

module.exports = {
  siteMetadata: {
    title: process.env.NAME,
    author: process.env.SITE_AUTHOR,
    description: process.env.SITE_DESCRIPTION,
    locale: {
      language: process.env.LOCALE.toLowerCase(),
      culture: process.env.CULTURE.toUpperCase(),
    },
    siteUrl: `${siteUrl}/`,
    organization: {
      company: process.env.ORGANIZATION_COMPANY,
      address: process.env.ORGANIZATION_ADDRESS_STREET,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/logo.png`,
      zipCode: process.env.ORGANIZATION_ADDRESS_ZIPCODE,
      city: process.env.ORGANIZATION_CITY,
      province: process.env.ORGANIZATION_PROVINCE,
      country: process.env.ORGANIZATION_COUNTRY,
      email: process.env.ORGANIZATION_EMAIL,
      taxId: process.env.ORGANIZATION_TAX_ID,
      vatId: process.env.ORGANIZATION_VAT_ID,
      registryId: process.env.ORGANIZATION_REGISTRY_ID,
      shareCapital: process.env.ORGANIZATION_SHARE_CAPITAL,
    },
    appearance: {
      accent: process.env.APPEARANCE_ACCENT,
      background: process.env.APPEARANCE_BACKGROUND,
      theme: process.env.APPEARANCE_THEME,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        mediaTypes: [`text/markdown`, `text/x-markdown`],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-source-graphcms",
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        buildMarkdownNodes: true,
        locales: [process.env.LOCALE],
        fragmentsPath: "fragments",
        downloadLocalImages: true,
        stages:
          (process.env.ENV || process.env.NODE_ENV) !== "production"
            ? ["DRAFT", "PUBLISHED"]
            : ["PUBLISHED"],
        concurrency: 10,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_ID,
          cookieName: "pittica-gdpr-analytics",
          anonymize: true,
          allowAdFeatures: false,
        },
        environments: ["production", "development"],
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-cookiehub`,
      options: {
        code: process.env.COOKIEHUB_ID,
        debug: (process.env.ENV || process.env.NODE_ENV) !== "production",
        cookie: "pittica-gdpr",
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        generator: process.env.SITE_AUTHOR,
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                site: {
                  siteMetadata: { siteUrl },
                },
                allGraphCmsPost: { nodes },
              },
            }) => {
              return nodes.map((node) => {
                const url = new URL(`/blog/${node.slug}`, siteUrl).href
                const author =
                  node.people.length > 0
                    ? `${node.people[0].email} (${node.people[0].firstName} ${node.people[0].lastName})`
                    : `${process.env.ORGANIZATION_EMAIL} (${process.env.SITE_AUTHOR})`

                return Object.assign({}, node, {
                  description: node.excerpt,
                  date: node.date,
                  url: url,
                  guid: url,
                  custom_elements: [
                    { "content:encoded": node.content.html },
                    { author },
                  ],
                  author,
                })
              })
            },
            query: `
              {
                allGraphCmsPost(filter: { stage: { eq: PUBLISHED }, locale: { eq: ${process.env.LOCALE} } }) {
                  nodes {
                    content {
                      html
                    }
                    title
                    slug
                    date
                    excerpt
                    people {
                      firstName
                      lastName
                      email
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Pittica's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: process.env.NAME,
        short_name: process.env.NAME,
        start_url: `/`,
        background_color: process.env.APPEARANCE_BACKGROUND,
        theme_color: process.env.APPEARANCE_ACCENT,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/./",
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
                context {
                  group
                  updatedAt
                }
              }
            }
          }
        `,
        resolvePages: ({
          site: {
            siteMetadata: { siteUrl },
          },
          allSitePage: { nodes },
        }) =>
          nodes.map(({ path, context }) => {
            const page = {
              path: new URL(path, siteUrl).href,
              changefreq: "daily",
              priority: 0.5,
              lastmod: null,
            }

            if (context && context) {
              if (context.updatedAt) {
                page.lastmod = context.updatedAt
              }

              if (context.group) {
                switch (context.group) {
                  case "post":
                    page.changefreq = "monthly"
                    page.priority = 0.7
                    break
                  case "page":
                    page.priority = 0.8
                    break
                  case "portfolio":
                    page.priority = 0.6
                    break
                  case "offers":
                    page.priority = 0.7
                    break
                  default:
                    page.priority = path === "/" ? 1.0 : 0.5
                    break
                }
              }
            }

            return page
          }),
        serialize: ({ path, changefreq, priority, lastmod }) => {
          return { url: path, changefreq, priority, lastmod }
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: [
          { domain: "https://www.gstatic.com", crossOrigin: true },
          { domain: "https://www.google.com", crossOrigin: true },
          { domain: "https://www.google-analytics.com", crossOrigin: true },
        ],
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        image: `/share.jpg`,
        socials: {
          twitter: {
            username: process.env.SOCIAL_TWITTER_USERNAME,
            icon: "icon-pittica-twitter",
            show: false,
          },
          github: {
            username: process.env.SOCIAL_GITHUB_USERNAME,
            icon: "icon-pittica-github",
          },
          facebook: {
            page: process.env.SOCIAL_FACEBOOK_PAGE,
            app: process.env.SOCIAL_FACEBOOK_APP,
            icon: "icon-pittica-facebook",
          },
          linkedin: {
            page: process.env.SOCIAL_LINKEDIN_PAGE,
            icon: "icon-pittica-linkedin",
          },
        },
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-vcard`,
      options: {
        query: `
          {
            people: allGraphCmsPerson(filter: { stage: { eq: PUBLISHED } }) {
              nodes {
                firstName
                lastName
                roles {
                  name
                }
                email
                phone
                linkedIn
                image {
                  localFile {
                    absolutePath
                  }
                }
              }
            }
          }
        `,
        getNodes: (data) => data.people.nodes,
        resolve: ({
          firstName,
          lastName,
          roles,
          email,
          phone,
          linkedIn,
          image,
        }) => ({
          firstName,
          lastName,
          role: commalify(roles.map(({ name }) => name)),
          email,
          phone,
          linkedIn,
          photo: image.localFile ? image.localFile.absolutePath : null,
        }),
        organization: process.env.ORGANIZATION_COMPANY,
        logo: `${__dirname}/static/logo.png`,
        url: siteUrl,
      },
    },
  ],
}
