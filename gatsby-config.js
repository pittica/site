require('dotenv').config();

module.exports = {
  flags: {
 //   PRESERVE_WEBPACK_CACHE: true,
 //   FAST_DEV: true
  },
  siteMetadata: {
    title: process.env.NAME,
    author: `Pittica S.r.l.s.`,
    description: `Mad Scientists At Work.`,
    locale: {
      language: process.env.LOCALE.toLowerCase(),
      culture: process.env.CULTURE.toUpperCase()
    },
    siteUrl: process.env.URL,
    legal: {
      privacy: '/legal/privacy',
      terms: '/legal/tos',
      cookies: '/legal/cookies'
    },
    organization: {
      company: `Pittica S.r.l.s.`,
      address: `Via Le Corbusier, 39`,
      url: process.env.NAME,
      logo: `${process.env.NAME}logo.png`,
      zipCode: `48124`,
      city: `Ravenna`,
      province: `RA`,
      country: `Italia`,
      email: `info@pittica.com`,
      taxId: `02650890391`,
      vatId: `02650890391`,
      registryId: `RA 220518`
    },
    appearance: {
      accent: `#cc151a`,
      background: `#ffffff`,
      theme: `#1d1d1d`
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [ `.md`, `.mdx` ],
        mediaTypes: [ `text/markdown`, `text/x-markdown` ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        buildMarkdownNodes: true,
        locales: [ process.env.LOCALE ],
        fragmentsPath: 'fragments',
        downloadLocalImages: true,
        stages: [ 'DRAFT', 'PUBLISHED' ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-156974102-1`,
        anonymize: true
      }
    },
    {
      resolve: `gatsby-plugin-htaccess`,
      options: {
        https: true,
        www: true,
        SymLinksIfOwnerMatch: true,
        host: 'pittica.com',
        ErrorDocument: `
          ErrorDocument 401 /error/401/index.html
          ErrorDocument 403 /error/403/index.html
          ErrorDocument 404 /error/404/index.html
          ErrorDocument 500 /error/500/index.html
        `
      }
    },
    {
      resolve: `gatsby-plugin-iubenda-cookie-footer`,
      options: {
        iubendaOptions: {
          lang: process.env.LOCALE.toLowerCase(),
          siteId: 1781270,
          countryDetection: true,
          consentOnContinuedBrowsing: false,
          cookiePolicyInOtherWindow: true,
          cookiePolicyId: 29008249,
          cookiePolicyUrl: `${process.env.NAME}legal/cookies`,
          banner: {
            position: 'float-top-center',
            textColor: '#fff',
            backgroundColor: '#1d1d1d',
            acceptButtonDisplay: true,
            acceptButtonColor: '#cc151a',
            acceptButtonCaptionColor: '#fff'
          }
        }
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
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
            serialize: ({ query: { site: { siteMetadata: { siteUrl } }, allGraphCmsPost: { nodes } } }) => {
              return nodes.map((node) => {
                const url = new URL(`/blog/${node.slug}`, siteUrl).href;

                return Object.assign({}, node, {
                  description: node.excerpt,
                  date: node.date,
                  url: url,
                  guid: url,
                  custom_elements: [ { 'content:encoded': node.content.html } ]
                });
              });
            },
            query: `
              {
                allGraphCmsPost(filter: {stage: {eq: PUBLISHED}, locale: {eq: it}}) {
                  nodes {
                    content {
                      html
                    }
                    title
                    slug
                    date
                    excerpt
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Pittica's RSS Feed"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pittica`,
        short_name: `Pittica`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#cc151a`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/./',
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
        resolvePages: ({ site: { siteMetadata: { siteUrl } }, allSitePage: { nodes } }) =>
          nodes.map(({ path, context }) => {
            const page = {
              path: new URL(path, siteUrl).href,
              changefreq: 'daily',
              priority: 0.5,
              lastmod: null
            };

            if (context && context) {
              if (context.updatedAt) {
                page.lastmod = context.updatedAt;
              }

              if (context.group) {
                switch (context.group) {
                  case 'post':
                    page.changefreq = 'monthly';
                    page.priority = 0.7;
                    break;
                  case 'page':
                    page.priority = 0.8;
                    break;
                  case 'portfolio':
                    page.priority = 0.6;
                    break;
                  case 'offers':
                    page.priority = 0.7;
                    break;
                  default:
                    page.priority = path === '/' ? 1.0 : 0.5;
                    break;
                }
              }
            }

            return page;
          }),
        serialize: ({ path, changefreq, priority, lastmod }) => {
          return { url: path, changefreq, priority, lastmod };
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          { domain: 'https://www.gstatic.com', crossOrigin: true },
          { domain: 'https://www.google.com', crossOrigin: true },
          { domain: 'https://www.google-analytics.com', crossOrigin: true }
        ]
      }
    },
    {
      resolve: `@pittica/gatsby-plugin-trustpilot-widget`,
      options: {
        username: 'pittica.com',
        template: '5419b6a8b0d04a076446a9ad',
        business: '5eaf034c658436000194e69b'
      }
    },
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        image: `/share.jpg`,
        socials: {
          twitter: {
            username: 'PitticaDigital',
            icon: 'icon-pittica-twitter',
            show: false
          },
          github: {
            username: `pittica`,
            icon: 'icon-pittica-github'
          },
          facebook: {
            page: `PitticaDigital`,
            app: `600384224115787`,
            icon: 'icon-pittica-facebook'
          },
          linkedin: {
            page: `pittica`,
            icon: 'icon-pittica-linkedin'
          }
        }
      }
    }
  ]
};
