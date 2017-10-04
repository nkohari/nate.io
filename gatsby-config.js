module.exports = {
  siteMetadata: {
    title: 'Discord&Rhyme',
    author: 'Nate Kohari',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 680,
              linkImagesToOriginal: false
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-23130622-1',
      },
    },
    {
      resolve: 'gatsby-plugin-stylus',
      options: {
        import: [`${__dirname}/src/css/vars.styl`]
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet'
  ],
}
