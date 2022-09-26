// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
let path = require("path")

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'L4 Docs',
  tagline: 'RRAM research and characterization',
  url: 'https://l4.granasat.space',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'L4 docs',
        logo: {
          alt: 'L4 docs',
          src: 'img/favicon.svg',
          srcDark: 'img/favicon.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Introduction',
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/granasat',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        // style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/granasat',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Granasat.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['matlab'],
      },
      colorMode: {
        'defaultMode': 'dark'
      }
    }),
  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    async function pdfPlugin(context, options) {
      console.log(path.join(__dirname, "src/"))
      return {
        name: 'pdf-plugin',
        configureWebpack(config, isServer, utils) {

          const { getJSLoader } = utils;
          return {
            resolve: {
              fallback: { 'path': require.resolve('path-browserify') },
              extensions: ['.jsx', '.js', '.tsx', '.ts'],
            },
            module: {
              rules: [
                {
                  test: /\.css$/,
                  exclude: /\.module\.css$/i,
                  // include: path.join(__dirname, "node_modules/react-pdf"),
                  include: {
                    or: [path.join(__dirname, "node_modules/react-pdf")]
                  },
                  use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                  ],
                },
                {
                  test: /\.less$/,
                  use: ['style-loader', 'css-loader', 'less-loader'],
                },
                {
                  test: /\.html$/,
                  use: ['html-loader'],
                },
                {
                  test: /canvas/,
                  use: ['null-loader'],
                },
              ],
            },
          };
        },
      }
    }
  ]
};

module.exports = config;
