require("dotenv").config()

const { commalify } = require("@pittica/gatsby-plugin-utils")

const siteUrl = process.env.URL || `https://${process.env.HOST}`

module.exports = {
  siteMetadata: {
    siteUrl: `${siteUrl}/`,
    title: process.env.NAME,
    author: process.env.AUTHOR,
    description: process.env.SITE_DESCRIPTION,
    locale: {
      language: process.env.LOCALE_LANGUAGE.toLowerCase(),
      culture: process.env.LOCALE_CULTURE.toUpperCase(),
    },
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
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locales`,
      },
    },
    {
      resolve: `gatsby-source-graphcms`,
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        locales: [process.env.LOCALE_LANGUAGE],
        fragmentsPath: "fragments",
        stages:
          (process.env.ENV || process.env.NODE_ENV) !== "production"
            ? ["DRAFT", "PUBLISHED"]
            : ["PUBLISHED"],
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locales`,
        languages: [process.env.LOCALE_LANGUAGE.toLowerCase(), "en"],
        defaultLanguage: process.env.LOCALE_LANGUAGE.toLowerCase(),
        fallbackLanguage: process.env.LOCALE_LANGUAGE.toLowerCase(),
        siteUrl,
        i18nextOptions: {
          defaultNS: "messages",
          nonExplicitSupportedLngs: true,
        },
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_ID,
          cookieName: "pittica-gdpr-analytics",
          anonymize: true,
          allowAdFeatures: false,
        },
        facebookPixel: {
          pixelId: process.env.FACEBOOK_PIXEL,
          cookieName: "pittica-gdpr-marketing",
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
    {
      resolve: `@pittica/gatsby-plugin-hubspot`,
      options: {
        region: "eu1",
        portal: process.env.HUBSPOT_PORTAL,
        cookie: "pittica-gdpr-marketing",
        form: "13783600-3a0e-4ed1-8233-d2a51d7c7c31",
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy: [
              { userAgent: "*", allow: "/" },
              {
                userAgent: "*",
                disallow: "/offline-plugin-app-shell-fallback",
              },
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        generator: process.env.AUTHOR,
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
                const element = {
                  title: node.title,
                  description: node.excerpt,
                  date: node.date,
                  url,
                  custom_elements: [
                    { "content:encoded": node.content.html },
                    { "dc:date": node.date },
                  ],
                  categories: node.categories.map(({ name }) => name),
                }

                if (node.people.length > 0) {
                  element.author = `${node.people[0].email} (${node.people[0].firstName} ${node.people[0].lastName})`
                  element.custom_elements.push({
                    "dc:creator": `${node.people[0].firstName} ${node.people[0].lastName}`,
                  })
                } else {
                  element.author = `${process.env.ORGANIZATION_EMAIL} (${process.env.AUTHOR})`
                  element.custom_elements.push({
                    "dc:creator": process.env.AUTHOR,
                  })
                }

                if (node.image && node.image.localFile) {
                  element.enclosure = {
                    url: new URL(node.image.localFile.publicURL, siteUrl).href,
                    length: node.image.localFile.size,
                    size: node.image.localFile.size,
                    type: node.image.mimeType,
                  }
                  element.custom_elements.push({
                    "media:content": [
                      {
                        _attr: {
                          url: new URL(node.image.localFile.publicURL, siteUrl)
                            .href,
                          medium: "image",
                          width: node.image.width,
                          height: node.image.height,
                        },
                      },
                      { "media:title": node.image.title },
                      {
                        "media:credit": node.image.credits
                          ? [
                              {
                                _attr: {
                                  role: "author",
                                  scheme: "urn:ebu",
                                },
                              },
                              node.image.credits.text
                                .replaceAll("\\n", "")
                                .trim(),
                            ]
                          : null,
                      },
                    ],
                  })
                }

                return element
              })
            },
            setup: (options) => {
              return {
                ...options,
                feed_url: new URL("/feed/blog.xml", siteUrl).href,
                site_url: new URL("/blog", siteUrl).href,
                image_url: new URL("/share.jpg", siteUrl).href,
                custom_elements: [
                  { language: process.env.LOCALE_LANGUAGE },
                  { "dc:language": process.env.LOCALE_LANGUAGE },
                  { "dc:creator": process.env.AUTHOR },
                ],
                custom_namespaces: {
                  media: "http://search.yahoo.com/mrss/",
                },
              }
            },
            query: `
              {
                allGraphCmsPost(filter: { stage: { eq: PUBLISHED }, locale: { eq: ${process.env.LOCALE_LANGUAGE} } }) {
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
                    categories {
                      name
                    }
                    image {
                      localFile {
                        publicURL
                        size
                      }
                      credits {
                        text
                      }
                      title
                      width
                      height
                      mimeType
                    }
                  }
                }
              }
            `,
            output: "/feed/blog.xml",
            title: process.env.NAME,
            description: process.env.SITE_DESCRIPTION,
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
        icon: `images/icon.png`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/./",
        query: `
          {
            allSitePage(filter: { path: { ne: "/offline-plugin-app-shell-fallback" } }) {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes } }) =>
          nodes.map(({ path, pageContext }) => {
            const page = {
              path: new URL(path, siteUrl).href,
              changefreq: "daily",
              priority: 0.5,
              lastmod: null,
            }

            if (pageContext) {
              if (pageContext.updatedAt) {
                page.lastmod = pageContext.updatedAt
              }

              if (pageContext.group) {
                switch (pageContext.group) {
                  case "blog":
                    page.changefreq = "monthly"
                    page.priority = 0.7
                    break
                  case "page":
                    page.priority = 0.9
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
        serialize: ({ path, changefreq, priority, lastmod }) => ({
          url: path,
          changefreq,
          priority,
          lastmod,
        }),
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-preconnect`,
      options: {
        domains: [
          { domain: "https://www.gstatic.com", crossOrigin: true },
          { domain: "https://www.google.com", crossOrigin: true },
          { domain: "https://www.google-analytics.com", crossOrigin: true },
        ],
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-trustpilot-widget`,
      options: {
        language: process.env.LOCALE_LANGUAGE.toLowerCase(),
        culture: process.env.LOCALE_CULTURE.toUpperCase(),
        theme: "dark",
        username: "pittica.com",
        template: "5419b6a8b0d04a076446a9ad",
        business: "5eaf034c658436000194e69b",
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
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        siteUrl: `${siteUrl}/`,
        title: process.env.NAME,
        description: process.env.SITE_DESCRIPTION,
        locale: {
          language: process.env.LOCALE_LANGUAGE.toLowerCase(),
          culture: process.env.LOCALE_CULTURE.toUpperCase(),
        },
        image: `/share.jpg`,
        organization: {
          name: process.env.ORGANIZATION_COMPANY,
          url: `${siteUrl}/`,
          logo: `${siteUrl}/logo.png`,
        },
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
        fields: {
          title: "post.title",
          description: "post.description",
          image:
            "post.image.localFile.childImageSharp.gatsbyImageData.images.fallback.src",
          imageFallback:
            "post.seoImageFallback.localFile.childImageSharp.gatsbyImageData.images.fallback.src",
        },
        debug: (process.env.ENV || process.env.NODE_ENV) !== "production",
      },
    },
  ],
}
